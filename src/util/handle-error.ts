import { AxiosError } from 'axios';
import Message from '../message';

export function handleError(error: AxiosError) {
  if (error.response) {
    const errorDataMessage = new Message(
      'ff0000',
      null,
      error.response.data as string
    );
    const errorStatusMessage = new Message(
      'ff0000',
      null,
      error.response.status.toString()
    );
    const errorHeadersMessage = new Message(
      'ff0000',
      null,
      JSON.stringify(error.response.headers)
    );

    errorDataMessage.print();
    errorStatusMessage.print();
    errorHeadersMessage.print();
  } else if (error.request) {
    const errorRequestMessage = new Message('ff0000', null, error.request);

    errorRequestMessage.print();
    console.log(error.request);
  } else {
    const errorMessage = new Message('ff0000', null, 'Error:' + error.request);

    errorMessage.print();
  }
}
