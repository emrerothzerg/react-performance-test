import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

interface Item {
  itemNumber: string;
  itemPrice: string;
  itemName: string | null;
  itemShortDescription: string | null;
  itemQuantity: string;
  totalPrice: string;
  itemActionDate?: string | null;
}

const areDatesIdentical = (items: Item[]): boolean => {
  if (items.length === 0) return false;

  return items.every((item) => {
    if (!item.itemActionDate || !items[0].itemActionDate) return false;
    return (
      new Date(item.itemActionDate).getTime() ===
      new Date(items[0].itemActionDate).getTime()
    );
  });
};

const areDatesIdenticalString = (items: Item[]): boolean => {
  if (items.length === 0) return false;

  return items.every((item) => {
    if (!item.itemActionDate || !items[0].itemActionDate) return false;
    return item.itemActionDate === items[0].itemActionDate;
  });
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [showPayload, setShowPayload] = useState(false);
  const [fnResult, setFnResult] = useState(false);
  const [itemsComparedTime, setItemsComparedTime] = useState("");

  const randomDay = () => Math.floor(Math.random() * 28) + 1;
  const randomMonth = () => Math.floor(Math.random() * 12) + 1;
  const randomHour = () => Math.floor(Math.random() * 20) + 1;

  const generateDifferentDateItems = () => {
    setItems([]);
    for (let i = 0; i < 300; i++) {
      const month = randomMonth();
      const day = randomDay();
      const hour = randomHour();

      const newItem = {
        itemNumber: "",
        itemPrice: "",
        itemName: "",
        itemShortDescription: "",
        itemQuantity: "",
        totalPrice: new Date(
          `2020-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}T${
            hour < 10 ? "0" : ""
          }${hour}:35:55.013Z`
        )
          .getTime()
          .toString(),
        itemActionDate: `2020-${month < 10 ? "0" : ""}${month}-${
          day < 10 ? "0" : ""
        }${day}T${hour < 10 ? "0" : ""}${hour}:35:55.013Z`,
      } as Item;
      setItems((items) => [...items, newItem]);
    }
    alert("different date items created!");
  };
  const generateSameDateItems = () => {
    setItems([]);
    for (let i = 0; i < 300; i++) {
      const newItem = {
        itemNumber: "",
        itemPrice: "",
        itemName: "",
        itemShortDescription: "",
        itemQuantity: "",
        totalPrice: new Date(`2020-09-14T15:35:55.013Z`).getTime().toString(),
        itemActionDate: `2020-09-14T15:35:55.013Z`,
      } as Item;
      setItems((items) => [...items, newItem]);
    }
    alert("same date items created!");
  };

  const compareItemDates = () => {
    const t0 = performance.now();
    const result = areDatesIdentical(items);
    const t1 = performance.now();
    setItemsComparedTime(
      "Call to areDatesIdentical took " + (t1 - t0) + " milliseconds."
    );
    setFnResult(result);
  };
  const compareItemDatesString = () => {
    const t0 = performance.now();
    const result = areDatesIdenticalString(items);
    const t1 = performance.now();
    setItemsComparedTime(
      "Call to areDatesIdentical took " + (t1 - t0) + " milliseconds."
    );
    setFnResult(result);
  };
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <button onClick={() => generateSameDateItems()}>
                Generate 300 items (same date)
              </button>
            </li>
            <li>
              <button onClick={() => generateDifferentDateItems()}>
                Generate 300 items (unique date)
              </button>
            </li>
            <li>
              <button onClick={() => setShowPayload(!showPayload)}>
                Toggle Payload
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setItemsComparedTime("");
                  compareItemDates();
                }}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Compare Now (DATE)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setItemsComparedTime("");
                  compareItemDatesString();
                }}
                style={{ backgroundColor: "orange", color: "white" }}
              >
                Compare Now (String)
              </button>
            </li>
          </ul>
        </nav>

        {itemsComparedTime !== "" ? (
          <p>
            {itemsComparedTime}
            <br />
            <br />
            <b>Fn Result:</b> {fnResult ? "TRUE" : "FALSE"}
          </p>
        ) : null}
        {showPayload ? <div>{JSON.stringify(items)}</div> : null}

        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <p>
        <b>Generate 300 items (same date)</b> {"--->"} Creates an item list with
        300 items in it, all have the same itemActionDate
      </p>
      <p>
        <b>Generate 300 items (unique date)</b> {"--->"} Creates an item list
        with 300 items in it, all have a unique itemActionDate
      </p>
      <p>
        <b>Toggle Payload</b> {"--->"} display the current item list
      </p>
      <p>
        <b>Compare Now (DATE)</b> {"--->"} comparing by using new
        Date(item.itemActionDate).getTime() === new
        Date(items[0].itemActionDate).getTime()
      </p>
      <p>
        <b>Compare Now (String)</b> {"--->"} comparing by using
        item.itemActionDate === items[0].itemActionDate
      </p>
    </>
  );
}
