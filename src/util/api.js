import * as methods from './methods';
import callApi from './callApi';

export function up() {
  return callApi({
    uri: "/non-secured/up",
    method: methods.GET,
  });
}
