/* eslint-disable consistent-return */
import Toast from '~/easy-components/Toast';

export function validateHour(e, fieldValue, formRef) {
  const time = e.target.value;

  let [hour, min] = time.split(':');

  if (time) {
    if (hour.indexOf('_') !== -1) {
      hour = `0${hour.replace(/_/, '')}`;
    }
    if (hour >= 0 && hour < 24) {
      if (min.indexOf('_') !== -1) {
        if (min === '__') {
          min = '00';
        } else {
          min = `0${min.replace(/_/, '')}`;
        }
      }

      if (min >= 0 && min < 60) {
        const newTime = hour + min;

        const intTime = parseInt(newTime, 10);

        formRef.current.setFieldValue(fieldValue, intTime);

        return true;
      }
      formRef.current.setFieldValue(fieldValue, null);
      formRef.current.setFieldValue('Duration', null);
      formRef.current.setFieldValue('_DurationFormatted', '0 Minutos');
      Toast.warn('Erro: Digite um minuto válido');

      return false;
    }
    formRef.current.setFieldValue(fieldValue, null);
    formRef.current.setFieldValue('Duration', null);
    formRef.current.setFieldValue('_DurationFormatted', '0 Minutos');
    Toast.warn('Erro: Digite uma hora válida');

    return false;
  }
}

export function getFullTimeInSecs(formRef) {
  const startDate = formRef.current.getFieldValue('StartDate');
  const startTime = formRef.current.getFieldValue('StartTime');
  const endDate = formRef.current.getFieldValue('EndDueDate');
  const endTime = formRef.current.getFieldValue('EndTime');

  if (startTime && endTime) {
    const s = startTime.split(':');
    const startSecs = s[0] * 60 * 60 + s[1] * 60;

    const e = endTime.split(':');
    const endSecs = e[0] * 60 * 60 + e[1] * 60;

    return {
      startDateSecs: startDate ? startDate.getTime() / 1000 : null,
      endDateSecs: endDate ? endDate.getTime() / 1000 : null,
      startTimeSecs: startSecs,
      endTimeSecs: endSecs,
    };
  }
  return null;
}

export function formatTimeBySec({
  seconds,
  defaultEmpty = null,
  hiddenSeconds = true,
}) {
  if (!seconds) return defaultEmpty;

  const days = seconds / 60 / 60 / 24;
  const hours = (seconds / 60 / 60) % 24;
  const minutes = (seconds / 60) % 60;
  const secs = seconds % 60;

  let time = '';

  if (Math.floor(days) === 0) {
    time += '';
  } else if (Math.floor(days) === 1) {
    time += `${Math.floor(days)} Dia `;
  } else {
    time += `${Math.floor(days)} Dias `;
  }

  if (Math.floor(hours) === 0) {
    time += '';
  } else if (Math.floor(hours) === 1) {
    time += `${Math.floor(hours)} Hora `;
  } else {
    time += `${Math.floor(hours)} Horas `;
  }

  if (Math.floor(minutes) === 0) {
    time += '';
  } else if (Math.floor(minutes) === 1) {
    time += `${Math.floor(minutes)} Minuto `;
  } else {
    time += `${Math.floor(minutes)} Minutos `;
  }

  if (!hiddenSeconds) {
    if (Math.floor(secs) === 0) {
      time += '';
    } else if (Math.floor(secs) === 1) {
      time += `${Math.floor(secs)} Segundo `;
    } else {
      time += `${Math.floor(secs)} Segundos `;
    }
  }

  return time === '' ? defaultEmpty : time;
}

export function formatDurationTime(formRef) {
  const secs = formRef.current.getFieldValue('Duration');

  const duration = formatTimeBySec({ seconds: secs });

  formRef.current.setFieldValue('_DurationFormatted', duration);
  formRef.current.setFieldValue('DurationType', 'S');
}

export function setDurationTime(e, formRef) {
  if (e.target) {
    const timeSecs = getFullTimeInSecs(formRef);
    if (timeSecs) {
      if (timeSecs.startDateSecs) {
        const diffDateSecs = timeSecs.startDateSecs - timeSecs.endDateSecs;

        if (diffDateSecs <= 0) {
          const diffHourSecs = timeSecs.endTimeSecs - timeSecs.startTimeSecs;

          const totalDiff = Math.abs(diffDateSecs) + diffHourSecs;

          if (totalDiff >= 0) {
            formRef.current.setFieldValue('Duration', totalDiff);
            formatDurationTime(formRef);
          }
        } else {
          formRef.current.setFieldValue('Duration', null);
          formRef.current.setFieldValue('_DurationFormatted', '0 Minutos');
          Toast.warn('Digite uma data inicial válida');
        }
      } else {
        formRef.current.setFieldValue('Duration', null);
        formRef.current.setFieldValue('_DurationFormatted', '0 Minutos');
        Toast.warn('Digite uma data final posterior à inicial');
      }
    } else {
      formRef.current.setFieldValue('Duration', null);
      formRef.current.setFieldValue('_DurationFormatted', '0 Minutos');
      Toast.warn('Digite uma hora ou data válida');
    }
  } else {
    Toast.warn('Campo não pode estar vazio');
  }
}

export function formatHourMask(value) {
  if (value) {
    const strValue = value.toString();

    if (strValue.indexOf(':') !== -1) {
      return strValue;
    }

    const hour =
      strValue.length === 3 ? `0${strValue.slice(0, 1)}` : strValue.slice(0, 2);

    const min = strValue.slice(-2);

    const newTime = `${hour}:${min}`;
    return newTime;
  }
}

export function getUnitInSeconds({ unit, value }) {
  const units = ['DIAS', 'HORAS', 'MINUTOS', 'SEGUNDOS'];

  let selectedUnit = null;
  let seconds = 0;

  const selUnit = units.find(u => u === unit.toUpperCase());

  if (selUnit) {
    selectedUnit = selUnit;
  } else {
    const suggestUnit = units.find(u => u.indexOf(unit.toUpperCase()) === 0);
    if (suggestUnit) {
      selectedUnit = suggestUnit;
    }
  }

  switch (selectedUnit) {
    case 'DIAS':
      seconds = +value * 60 * 60 * 24;
      break;

    case 'HORAS':
      seconds = +value * 60 * 60;
      break;

    case 'MINUTOS':
      seconds = +value * 60;
      break;

    case 'SEGUNDOS':
      seconds = +value;
      break;

    default:
      throw new Error('Unidade inválida');
  }

  if (Number.isNaN(seconds)) throw new Error('Valor inválido');

  return seconds;
}

export function convertTextTimeInSec(textTime) {
  let textToConvert = textTime;
  let finalSeconds = 0;

  if (textToConvert) {
    let valuesToConvert = textToConvert.split(' ');

    // verifica se todas as unidades foram digitadas
    if (valuesToConvert.length % 2 !== 0) {
      textToConvert += ' Minutos';
      valuesToConvert = textToConvert.split(' ');
    }

    for (let cont = 0; cont < valuesToConvert.length; cont += 2) {
      const seconds = getUnitInSeconds({
        value: valuesToConvert[cont],
        unit: valuesToConvert[cont + 1],
      });

      finalSeconds += seconds;
    }
  }
  return finalSeconds;
}

export function setStartEndTimeByText(e, formRef) {
  let durationSeconds = 0;
  try {
    const durationData = e.target.value.trim();

    // converter tempo de diferença em segundos
    durationSeconds = convertTextTimeInSec(durationData);

    // pegar a data inicial + horario atual
    // transformar tudo em segundos

    if (durationSeconds) {
      const textTimeinSecs = getFullTimeInSecs(formRef);

      const currentDateTime =
        textTimeinSecs.startDateSecs + textTimeinSecs.startTimeSecs;

      const totalDateMiliSecs = currentDateTime * 1000 + durationSeconds * 1000;

      const finalDate = new Date(totalDateMiliSecs);

      const hours = String(finalDate.getHours()).padStart(2, '0');
      const minutes = String(finalDate.getMinutes()).padStart(2, '0');

      const days = String(finalDate.getDate()).padStart(2, '0');
      const month = String(finalDate.getMonth() + 1).padStart(2, '0');
      const year = String(finalDate.getFullYear()).padStart(2, '0');

      const endTime = `${hours}:${minutes}`;
      const endDate = `${year}-${month}-${days}`;

      formRef.current.setFieldValue('EndTime', endTime);
      formRef.current.setFieldValue('EndDueDate', endDate);
    }
  } catch (error) {
    durationSeconds = 0;
  } finally {
    e.target.value = formatTimeBySec({
      seconds: durationSeconds,
      defaultEmpty: '0 Minutos',
    });
  }
}

export function setReminderData(e, formRef) {
  let value = 0;
  try {
    const reminderData = e.target.value.trim();

    value = convertTextTimeInSec(reminderData);
  } catch (error) {
    value = 0;
  } finally {
    e.target.value = formatTimeBySec({
      seconds: value,
      defaultEmpty: '0 Minutos',
      hiddenSeconds: false,
    });
    formRef.current.setFieldValue('ReminderPeriod', value);
  }
}

export function formatReminderData(formRef) {
  let reminderType = formRef.current.getFieldValue('ReminderType');
  let reminderPeriod = formRef.current.getFieldValue('ReminderPeriod');

  if (reminderType === 'M') {
    reminderPeriod *= 60;
    reminderType = 'S';
  }

  const formattedReminderTime = formatTimeBySec({
    seconds: reminderPeriod,
    hiddenSeconds: false,
  });

  formRef.current.setFieldValue('ReminderType', reminderType);
  formRef.current.setFieldValue('ReminderPeriod', reminderPeriod);
  formRef.current.setFieldValue('_ReminderPeriod', formattedReminderTime);
}
