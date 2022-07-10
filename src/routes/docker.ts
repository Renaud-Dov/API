import express from "express";
import Docker from "dockerode";

const router = express.Router();
const docker = new Docker({socketPath: '/var/run/docker.sock'});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("Hello World!");
});
router.get("/container", (req, res) => {
    const containerName = req.body.container;
    docker.listContainers((err, containers) => {
        if (err) {
            res.status(500).send("An error occurred");
            console.error(err);
        } else {
            const result = containers?.find(container => container.Names.includes("/" + containerName))
            if (result) {
                res.status(200).send("Container is running");
            } else {
                res.status(400).send("Container is not running");
            }
        }
    });

});

module.exports = router;
