const {
  gdprMiddleware,
  anonymizeData,
} = require("../../../src/middleware/gdpr");

describe("GDPR Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      method: "GET",
      headers: {},
      cookies: {},
    };
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    next = jest.fn();
  });

  describe("gdprMiddleware", () => {
    it("should add privacy policy header", () => {
      gdprMiddleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Privacy-Policy",
        "https://tmt.example.com/privacy"
      );
    });

    it("should let GET requests pass without consent", () => {
      req.method = "GET";

      gdprMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should block POST requests without consent", () => {
      req.method = "POST";

      gdprMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: "Consent required",
        message: "Please accept our privacy policy before submitting data",
        consentUrl: "https://tmt.example.com/consent",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should allow POST requests with header consent", () => {
      req.method = "POST";
      req.headers["user-consent"] = "true";

      gdprMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should allow POST requests with cookie consent", () => {
      req.method = "POST";
      req.cookies["data_consent"] = "true";

      gdprMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should override cookie method with secure defaults", () => {
      const originalCookie = res.cookie;

      gdprMiddleware(req, res, next);

      expect(res.cookie).not.toBe(originalCookie);

      // Test the new cookie function
      res.cookie("test-cookie", "value");

      expect(originalCookie).toHaveBeenCalledWith(
        "test-cookie",
        "value",
        expect.objectContaining({
          httpOnly: true,
          sameSite: "strict",
        })
      );
    });
  });

  describe("anonymizeData", () => {
    it("should return null for null input", () => {
      expect(anonymizeData(null)).toBeNull();
    });

    it("should anonymize email address", () => {
      const data = { email: "john.doe@example.com" };
      const result = anonymizeData(data);

      expect(result.email).toBe("jo***@example.com");
    });

    it("should anonymize name", () => {
      const data = { name: "John Doe" };
      const result = anonymizeData(data);

      expect(result.name).toBe("Jo***");
    });

    it("should anonymize phone number", () => {
      const data = { phone: "1234567890" };
      const result = anonymizeData(data);

      expect(result.phone).toBe("12***");
    });

    it("should anonymize address", () => {
      const data = { address: "123 Main St, City" };
      const result = anonymizeData(data);

      expect(result.address).toBe("12***");
    });

    it("should handle objects with no sensitive fields", () => {
      const data = { id: 123, status: "active" };
      const result = anonymizeData(data);

      expect(result).toEqual(data);
    });
  });
});
