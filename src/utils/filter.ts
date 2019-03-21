const filters: any = {
  // 时间戳转化为正常的时间格式
  date_format(time: number): string {
      const timeStamp = time * 1000;
      const year = new Date(timeStamp).getFullYear();
      const month = new Date(timeStamp).getMonth() + 1;
      const day = new Date(timeStamp).getDate();
      const hour = new Date(timeStamp).getHours();
      const minute = new Date(timeStamp).getMinutes();

      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  },
};

export default filters;
