import angular from 'angular';
import 'angular-mocks';
import authenticationModule from '../../../src/submodules/authentication/authenticationModule.js';

const {inject, module} = angular.mock;

describe("SignUpRequestApi", () => {
  let $httpBackend,
      SignUpRequestApi,
      credentialsSubmissionCBs;

  const NEW_USER = { username: "TEST_USER", password: "PASSWORD" };
  const SAVED_USER = { username: "TEST_USER", id: 1 };

  beforeEach(module(authenticationModule));

  beforeEach(() => {
    credentialsSubmissionCBs = {
      successCB: function () {},
      failureCB: function () {}
    };

    module(function ($provide) {
      $provide.value('credentialsSubmissionCBs', credentialsSubmissionCBs);
    });
  });

  beforeEach(inject((_$httpBackend_, _SignUpRequestApi_) => {
    $httpBackend = _$httpBackend_;
    SignUpRequestApi = _SignUpRequestApi_;
  }));

  it("should be wired into the app", () => {
    expect(SignUpRequestApi).toBeDefined();
  });

  describe("#signUp", () => {
    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it("should call successCB when request is successful", () => {
      spyOn(credentialsSubmissionCBs, "successCB");

      $httpBackend.expectPOST('/api/createAccount').respond(200, { user: SAVED_USER });
      SignUpRequestApi.signUp({ newUser: NEW_USER });
      $httpBackend.flush();

      expect(credentialsSubmissionCBs.successCB).toHaveBeenCalled();
    });

    it("should call a failure callback input by the method caller when the request fails", () => {
      spyOn(credentialsSubmissionCBs, "failureCB");

      $httpBackend.expectPOST('/api/createAccount').respond(409);
      SignUpRequestApi.signUp({ newUser: NEW_USER });
      $httpBackend.flush();

      expect(credentialsSubmissionCBs.failureCB).toHaveBeenCalled();
    });
  });
});
