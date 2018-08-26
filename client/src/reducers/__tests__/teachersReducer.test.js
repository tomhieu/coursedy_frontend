/* eslint-disable */
import {
  Teachers,
  initialState
} from '../TeachersReducer';
import { FETCH_TEACHERS } from '../../actions/AsyncActionCreator';
import { FULFILLED, PENDING, REJECTED } from '../../constants/AsynPostfix';
import { teacherList } from '../../constants/mockupDataConstants';


describe("teachers::Reducer", () => {
  let requestAction;
  let successAction;
  let rejectAction;

  beforeAll(() => {
    requestAction = {
      type: FETCH_TEACHERS + PENDING
    };

    successAction = {
      type: FETCH_TEACHERS + FULFILLED,
      payload: teacherList.data,
      headers: teacherList.headers
    };

    rejectAction = {
      type: FETCH_TEACHERS + REJECTED,
      error: 'Fetch teachers errors'
    };
  });

  test("should return initial state", () => {
    expect(Teachers(undefined, {})).toEqual(initialState);
  });

  test("should handle PENDING", () => {
    const expectedState = {
      ...initialState,
      isFetching: true
    };

    expect(Teachers(undefined, requestAction)).toEqual(expectedState);
  });

  test("should handle FULFILLED", () => {
    const expectedState = {
      ...initialState,
      isFetching: false,
      data: teacherList.data,
      headers: teacherList.headers
    };

    expect(Teachers(undefined, successAction)).toEqual(expectedState);
  });

  test("should handle REJECTED", () => {
    const expectedState = {
      ...initialState,
      isFetching: false,
      error: rejectAction.error
    };

    expect(Teachers(undefined, rejectAction)).toEqual(expectedState);
  });
});
