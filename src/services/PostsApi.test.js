import axiosMock from "axios";
import PostsApi from "./PostsApi";

jest.mock("axios");

it("fetches data from PostsApi", async () => {
  const returnData = [
    {
      id: 5,
      author: "John Doe"
    }, 
    {
      id: 6,
      author: "Jane Doe"
    }
  ];

  // setup
  axiosMock.get.mockResolvedValueOnce({ data: returnData });

  // work
  const posts = await PostsApi.getPosts();

  // expect
  expect(posts).toEqual(returnData);
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith("https://picsum.photos/list");
});
