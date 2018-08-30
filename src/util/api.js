import * as methods from './methods';
import callApi from './callApi';

export function up() {
  return callApi({
    uri: "/non-secured/up",
    method: methods.GET,
  });
}

export function newQuestion() {
  return callApi({
    uri: "/api/question",
    method: methods.POST,
  });
}
