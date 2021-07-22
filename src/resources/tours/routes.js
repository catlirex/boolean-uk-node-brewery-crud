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
  {
    id: 3,
    breweryId: 9094,
    numberPeople: 2,
    date: "1/12/2021",
  },
  {
    id: 4,
    breweryId: 9094,
    numberPeople: 2,
    date: "1/12/2021",
  },
];

const express = require("express");
const toursRouter = express.Router();
const sortAscById = require("../../helperFunction");

toursRouter.get("/", (req, res) => {
  const queryContent = req.query;
  let filteredTours = [...tourDB];
  console.log(queryContent);

  if (Object.keys(queryContent).length === 0) res.json({ tourDB });
  if (
    !Object.keys(queryContent).some(
      (key) => key === "breweryId" || key === "sort"
    )
  )
    res.json({ Error: "Query not found" });

  if (queryContent.breweryId) {
    filteredTours = filteredTours.filter(
      (target) => target.breweryId === Number(queryContent.breweryId)
    );
    if (filteredTours.length === 0)
      res.json({
        Error: `breweryId: ${queryContent.breweryId} not found`,
      });
  }
  if (queryContent.sort === "desc") filteredTours = filteredTours.reverse();

  res.json({ filteredTours });
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
  tourDB.sort(sortAscById());

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
