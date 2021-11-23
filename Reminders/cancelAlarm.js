
import PropTypes from "prop-types";
import notifee from "@notifee/react-native"

import { getAlarmById } from "./getReminders";
import { editAlarm } from "./editAlarm";

export const cancelAlarmById = async (id) => {
  if (!id) {
    throw new Error("Please enter an alarm id");
  }
  const alarm = await getAlarmById(id);
  if (!alarm) {
    throw new Error("There is not an alarm with this id");
  }
  const updatedAlarm = await editAlarm(Object.assign({}, alarm, { active: false }));
  notifee.cancelTriggerNotification(id.toString());
  return updatedAlarm
};

cancelAlarmById.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};