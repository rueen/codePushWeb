const type = 'dev';
const conf = {
  prod: {
    host: 'http://push.seatent.cn'
  },
  dev: {
    host: 'http://localhost:3000'
  }
}

export default conf[type];