let tourDB = [
  {
    id: 1,
    breweryId: 9242,
    numberPeople: 2,
    date: "23/12/2021",
  },
  {
    id: 2,
    breweryId: 9094,
    numberPeople: 2,
    date: "1/12/2021",
  },
];

const express = require("express");
const toursRouter = express.Router();

toursRouter.get("/", (req, res) => {
  res.json({ tourDB });
});

toursRouter.get("/:id", (req, res) => {
  let filteredTour = tourDB.find(
    (target) => target.id === Number(req.params.id)
  );
  if (!filteredTour) res.json({ Error: `ID:${req.params.id} Not found` });
  res.json({ filteredTour });
});

toursRouter.post("/", (req, res) => {
  tourDB = [...tourDB, req.body];
  const response = {
    route: req.originalUrl,
    method: req.method,
    body: req.body,
  };

  res.json({ response });
});

toursRouter.delete("/:id", (req, res) => {
  const target = tourDB.find((target) => target.id === Number(req.params.id));
  if (!target) res.json({ response: "Fail to delete, Id not found" });

  tourDB = tourDB.filter((target) => target.id !== Number(req.params.id));
  res.json({ response: "ok" });
});

toursRouter.patch("/:id", (req, res) => {
  let updateTarget = tourDB.find(
    (target) => target.id === Number(req.params.id)
  );
  if (!updateTarget) res.json({ Error: "Target not find" });

  updateTarget = { ...updateTarget, ...req.body };
  tourDB = tourDB.map((target) => {
    if (target.id === Number(req.params.id)) return updateTarget;
    else return target;
  });
  res.json({ updateTarget });
});

module.exports = toursRouter;
