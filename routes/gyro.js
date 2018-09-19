const router = require("express").Router();
const Gyro = require('../controllers/gyro');

router
	.route("/")
	.get(Gyro.getAllGyro)
	.post(Gyro.create);

router
	.route("/:id")
	.get(Gyro.getGyroById)
	.delete(Gyro.remove)
	.update(Gyro.update);

module.exports = router;