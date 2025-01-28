import { handler as GetViewCount } from "./GetViewCount/index.mjs";
import { handler as UpdateViewCount } from "./UpdateViewCount/index.mjs";
require("dotenv").config();

test("Get test data", async () => {
  const event = {
    ip: "test.test",
  };
  const result = await GetViewCount(event);
  const res = {
    //ip: "test.test",
    individualViewCount: 0,
    //totalViewCount: 1,
    //lastVisited: "2006-06-14",
    //details: "test data",
  };
  expect(result).toEqual(expect.objectContaining(res));
  return;
});

test("Post test data", async () => {
  const event = {
    ip: "test.post",
    lastVisited: 0,
  };
  const result = await UpdateViewCount(event);
  const res = {
    acknowledged: true,
  };
  expect(result).toEqual(expect.objectContaining(res));
  return;
});
