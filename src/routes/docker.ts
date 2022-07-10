import express from "express";
import Docker from "dockerode";

const router = express.Router();
const docker = new Docker({socketPath: '/var/run/docker.sock'});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("Hello World!");
});
router.get("/containers", (req, res) => {
    docker.listContainers((err, containers) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(containers);
        }
    });

});

module.exports = router;
