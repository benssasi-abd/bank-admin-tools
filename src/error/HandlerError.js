export class HandleError extends Error {
  constructor(response: any) {
    if (response.data?.error) {
      super(response.data.error[Object.keys(response.data.error)[0]]);
    } else {
      super(response.data[Object.keys(response.data)[0]]);
    }
  }
}
