const TrailController = require("../controllers/trail.controller");
const {authenticate} = require("../config/jwt.config")

module.exports= (app)=> {
    app.get("/api/trails", TrailController.findAllTrails);
    app.post("/api/trails", authenticate, TrailController.createNewTrail);
    app.get("/api/trails/:id", TrailController.findOneTrail);
    app.get("/api/incompletetrailsbyuser/:username", authenticate, TrailController.findAllIncompleteTrailsByUser);
    app.get("/api/completedtrailsbyuser/:username", authenticate, TrailController.findAllCompletedTrailsByUser);
    app.delete("/api/trails/:id", TrailController.deleteOneTrail);
    app.put("/api/trails/:id", TrailController.updateTrail);
    }