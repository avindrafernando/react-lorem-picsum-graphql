import React from "react";
import { render, waitForElement} from "@testing-library/react";
import axiosMock from "axios";
import Posts from "./Posts";

jest.mock("axios");

test("Posts Component", async () => {
  // Arrange
  const returnData = [
    {
      author: "John Doe",
      author_url: "https://unsplash.com/@johndoe",
      filename: "0000_yC-Yzbqy7PY.jpeg",
      format: "jpeg",
      height: 3744,
      id: 0,
      post_url: "https://unsplash.com/photos/yC-Yzbqy7PY",
      width: 5616
    },
    {
      author: "Jane Doe",
      author_url: "https://unsplash.com/@janedoe",
      filename: "0100_pwaaqfoMibI.jpeg",
      format: "jpeg",
      height: 1656,
      id: 1,
      post_url: "https://unsplash.com/photos/pwaaqfoMibI",
      width: 2500
    }
  ];

  axiosMock.get.mockResolvedValueOnce({ data: returnData });
  
  // Act
  // const {getByTitle, container} = render(<Posts/>);

  // const [cardNode1, cardNode2] = await waitForElement(() =>
  //   [getByTitle("John Doe"), getByTitle("Jane Doe")]
  // );

  const {findByTitle, container} = render(<Posts/>);

  const cardNode1 = await findByTitle("John Doe");
  const cardNode2 = await findByTitle("Jane Doe");

  // Assert
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith("https://picsum.photos/list");
  
  expect(cardNode1).toHaveStyle("backgroundImage: 'url(\"https://picsum.photos/250/375?image=0\")'");
  expect(cardNode2).toHaveStyle("backgroundImage: 'url(\"https://picsum.photos/250/375?image=1\")'");

  // snapshots work great with regular DOM nodes!
  expect(container.firstChild).toMatchSnapshot();
});
