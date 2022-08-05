const { Dailylogs } = require('models');
const { Op } = require('sequelize');
const STATUS = require('lib/codes');
const { NotFound, BadRequest } = require('lib/errors');

const createDailylog = async (req, res) => {
  const { timestamp, duration, user_id } = req.body;

  try {
    const addedLog = await Dailylogs.create({
      timestamp: timestamp,
      duration: duration,
      user_id: user_id,
    });

    res.status(STATUS.CREATED).send(addedLog);
  } catch (err) {
    throw new BadRequest('Error creating the log ' + err);
  }
};

const updateDailylog = async (req, res) => {
  const id = req.params.id;
  const { timestamp, duration, user_id } = req.body;

  const foundLog = await Dailylogs.findOne({ where: { id: id } });

  try {
    await foundLog.update({
      timestamp: timestamp,
      duration: duration,
      user_id: user_id,
    });

    res.status(STATUS.CREATED).send(foundLog);
  } catch (err) {
    throw new BadRequest('Error updating the log ' + err);
  }
};

const deleteDailylog = async (req, res) => {
  const id = req.params.id;

  try {
    await Dailylogs.destroy({
      where: { id: id },
    });

    res.sendStatus(STATUS.NO_CONTENT);
  } catch (err) {
    throw new NotFound('Error deleting the log ' + err);
  }
};

const getDailylogs = async (req, res) => {
  const user_id = req.params.id;
  const { start_date, end_date } = req.query;

  try {
    const foundLogs = await Dailylogs.findAll({
      where: {
        user_id: user_id,
        timestamp: { [Op.between]: [start_date, end_date] },
      },
    });

    res.status(STATUS.OK).send(foundLogs);
  } catch (err) {
    throw new BadRequest('Error getting the logs ' + err);
  }
};

module.exports = {
  createDailylog,
  updateDailylog,
  deleteDailylog,
  getDailylogs,
};
