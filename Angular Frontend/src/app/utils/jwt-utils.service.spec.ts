import { base64UrlDecode, decodeJwt } from './jwt-utils.service';

describe('JWT Utils Tests', () => {

  describe('base64UrlDecode', () => {

    it('should handle base64 URL strings with missing padding', () => {
      const base64Url = 'SGVsbG8td29ybGQ_';
      const decoded = base64UrlDecode(base64Url);
      expect(decoded).toBe('Hello-world?');
    });

    it('should handle base64 URL strings with missing padding', () => {
      const base64Url = 'SGVsbG8td29ybGQ_';
      const decoded = base64UrlDecode(base64Url);
      expect(decoded).toBe('Hello-world');
    });

    it('should throw an error for invalid base64 URL encoded input', () => {
      const invalidBase64Url = 'SGVsbG8**d29ybGQ';
      expect(() => base64UrlDecode(invalidBase64Url)).toThrowError();
    });
  });

  describe('decodeJwt', () => {

    it('should correctly decode a JWT token payload', () => {
      const validJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                       'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
                       'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const decoded = decodeJwt(validJwt);
      expect(decoded).toEqual({
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022
      });
    });

    it('should throw an error if the token does not have 3 parts', () => {
      const invalidJwt = 'invalid.jwt.token';
      expect(() => decodeJwt(invalidJwt)).toThrowError('JWT does not have 3 parts');
    });

    it('should handle invalid base64 encoding in the token', () => {
      const invalidBase64Jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                               'invalidPayload.' +
                               'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      expect(() => decodeJwt(invalidBase64Jwt)).toThrowError();
    });

  });

});
