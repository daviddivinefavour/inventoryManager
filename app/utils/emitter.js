import moment from 'moment';
import io from '../services/socket';

export default emitToClients = (title, data) => {
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  const message = {
    title,
    data,
    time: currentTime
  };
  io.emit('message', message);
};
