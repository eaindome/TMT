const { verifyToken } = require("../../../src/middleware/auth");
const firebaseAdmin = require("firebase-admin");

jest.mock("firebase-admin");

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer test-token",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    // Reset mocks
    jest.clearAllMocks();
  });

  it("should verify token and set user in request", async () => {
    const mockDecodedToken = {
      uid: "test-user-id",
      email: "test@example.com",
    };

    firebaseAdmin.auth().verifyIdToken.mockResolvedValue(mockDecodedToken);

    await verifyToken(req, res, next);

    expect(firebaseAdmin.auth().verifyIdToken).toHaveBeenCalledWith(
      "test-token"
    );
    expect(req.user).toEqual(mockDecodedToken);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if no authorization header is provided", async () => {
    req.headers.authorization = undefined;

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Authorization header is required",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token format is invalid", async () => {
    req.headers.authorization = "InvalidFormat";

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token format" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token verification fails", async () => {
    firebaseAdmin
      .auth()
      .verifyIdToken.mockRejectedValue(new Error("Invalid token"));

    await verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Authentication failed: Invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
