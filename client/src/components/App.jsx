import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import axios from "axios";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { makeStyles } from "@material-ui/core";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
// dateStart: "2021-01-01T00:00:00.000Z", dateEnd: "2021-02-15T00:00:00.000Z" 2021-04-13T07:59:59.999Z
// let dateStart = "2021-04-01T00:00:00.000Z";
// let dateEnd = "2021-05-01T07:59:59.999Z";
const GET_ORDERS = gql`
  query {
    orders(
      dateStart: "2021-07-01T00:00:00.000Z"
      dateEnd: "2021-07-31T07:59:59.999Z"
      dateType: "delivery"
    ) {
      index
      fulfillment {
        groups {
          index
          label
          code
          shopLabour {
            time {
              value
              type
              unit
            }
          }
        }
      }
      items {
        quantity
        type
        fulfillmentGroup {
          index
          label
          code
        }
        materials {
          quantity
          calculations {
            weight {
              total {
                value
              }
            }
          }
        }
        joints {
          calculations {
            weight {
              total {
                value
                type
                unit
              }
            }
          }
        }
        reinforcements {
          calculations {
            weight {
              total {
                value
                type
                unit
              }
            }
          }
        }
      }
    }
    timecards(
      dateStart: "2021-07-01T07:00:00.000Z"
      dateEnd: "2021-07-31T07:00:00.000Z"
      dateType: "delivery"
    ) {
      id
      entries {
        minutes
        code {
          code
          label
        }
        job {
          name
          number
          label
        }
        type
        userGroup {
          label
        }
      }
    }
  }
`;

const GET_ORDER = gql`
  query {
    orders(orderIndex: 8982) {
      fulfillment {
        groups {
          index
          label
          code
          shopLabour {
            time {
              value
              type
              unit
            }
          }
        }
      }
      items {
        quantity
        fulfillmentGroup {
          index
          label
          code
        }
        materials {
          quantity
          calculations {
            weight {
              total {
                value
              }
            }
          }
        }
        joints {
          calculations {
            weight {
              total {
                value
                type
                unit
              }
            }
          }
        }
        reinforcements {
          calculations {
            weight {
              total {
                value
                type
                unit
              }
            }
          }
        }
      }
    }
  }
`;

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

let map = {
  1: {
    fg: "Cut",
    weight: 0,
    shopLabour: 0,
  },
  4: {
    fg: "Coil Line",
    weight: 0,
    shopLabour: 0,
  },
  5: {
    fg: "Round Fittings",
    weight: 0,
    shopLabour: 0,
  },
  6: {
    fg: "ASM",
    weight: 0,
    shopLabour: 0,
  },
  7: {
    fg: "Rectangular Fittings",
    weight: 0,
    shopLabour: 0,
  },

  9: {
    fg: "Hangers And Supports",
    weight: 0,
    shopLabour: 0,
  },

  20101: {
    fg: "Shop Detailing and Management",
    weight: 0,
    shopLabour: 0,
  },
  20102: {
    fg: "Sheet Metal Inputting",
    weight: 0,
    shopLabour: 0,
  },
  20503: {
    fg: "Duct Cleaning",
    weight: 0,
    shopLabour: 0,
  },
};

function App() {
  useEffect(() => {
    axios
      .post("https://api.webduct.com/public/oauth/authorize/password", {
        username: "api@umi1.com",
        password: "umi1",
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  });

  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading Masterpieces...</p>;
  if (error) return `Error! ${error}`;

  console.log("total number of orders: ", data.orders.length);
  console.log("total number of timecards: ", data.timecards.length);

  for (let order of data.orders) {
    let fg = order.fulfillment;
    let items = order.items;

    if (!fg) {
      // console.log("No fulfillment for this order")
      // console.log(order)
    } else {
      fg = order.fulfillment.groups;
      for (let group of fg) {
        let { index, label, shopLabour } = group;

        if (!map.hasOwnProperty(index)) {
          let newObj = {};
          newObj.fg = label;
          newObj.weight = 0;
          newObj.shopLabour = 0;
          map[index] = newObj;
        }
      }
    }

    for (let item of items) {
      if (item.materials === null) {
        continue;
      }

      let weight = item.materials[0].calculations.weight.total.value;

      let { quantity, joints, reinforcements, fulfillmentGroup } = item;

      for (let joint of joints) {
        if (joint.calculations.weight.total.value !== 0) {
          weight += joint.calculations.weight.total.value;
        }
      }

      if (reinforcements !== null && reinforcements.length !== 0) {
        if (reinforcements[0].calculations.weight.total.value !== 0) {
          weight += reinforcements[0].calculations.weight.total.value;
        }
      }

      if (fulfillmentGroup !== null) {
        map[fulfillmentGroup.index].weight += weight * quantity;
      } else {
        map[99].weight += weight * quantity;
      }
    }
  }

  let totalTime = 0;

  for (let card of data.timecards) {
    for (let entry of card.entries) {
      let minutes = entry.minutes;
      let code = Number(entry.code.code);
      let label = entry.code.label;
      totalTime += minutes;

      if (code === 20201 || code === 20301) {
        map[4].shopLabour += roundToTwo(minutes / 60);
      } else if (code === 20212 || code === 20222) {
        map[5].shopLabour += roundToTwo(minutes / 60);
      } else if (code === 20261) {
        map[6].shopLabour += roundToTwo(minutes / 60);
      } else if (code === 20202 || code === 20302) {
        map[7].shopLabour += roundToTwo(minutes / 60);
      } else if (code === 20401 || code === 20402 || code === 20403) {
        map[9].shopLabour += roundToTwo(minutes / 60);
        console.log("anything here!?");
      } else if (code === 20231 || code === 20241 || code === 20404) {
        map[11].shopLabour += roundToTwo(minutes / 60);
      } else {
        if (!map.hasOwnProperty(code)) {
          let newObj = {};
          newObj.fg = label;
          newObj.weight = 0;
          newObj.shopLabour = 0;
          map[code] = newObj;
        }

        map[code].shopLabour += roundToTwo(minutes / 60);
      }
    }
  }
  console.log(map[9]);
  console.log(map[3]);
  console.log("TOTAL TIME: ", totalTime);

  map[6].weight += map[1].weight;
  map[7].weight += map[10].weight;
  map[9].weight += map[3].weight;
  delete map[1];
  delete map[3];
  delete map[10];

  console.log(map);

  let fgArray = [];
  let fgArray2 = [];
  let totalWeight = 0;
  let totalLabor = 0;
  let totalWeight2 = 0;
  let totalLabor2 = 0;

  for (let index in map) {
    if (map[index].weight === 0 && map[index].shopLabour === 0) {
      continue;
    }

    let roundedWeight = Math.round(map[index].weight);
    let roundedShopLabour = Math.round(map[index].shopLabour);
    let roundedPoundPerHour =
      Math.round(roundedWeight / roundedShopLabour) || 0;
    if (!isFinite(roundedPoundPerHour)) {
      roundedPoundPerHour = 0;
    }

    // console.log("typeof" ,typeof index)
    if (index === "20101" || index === "25341") {
      // console.log("adding weight to 2nd totals")
      totalWeight2 += roundedWeight;
      totalLabor2 += roundedShopLabour;
    } else {
      totalWeight += roundedWeight;
      totalLabor += roundedShopLabour;
    }

    map[index].weight = separator(roundedWeight);
    map[index].shopLabour = separator(roundedShopLabour);
    map[index].poundPerHour = separator(roundedPoundPerHour);

    if (map[index].shopLabour === 0 && map[index].weight === 0) {
      continue;
    }

    if (index === "20101" || index === "25341") {
      fgArray2.push(map[index]);
    } else {
      fgArray.push(map[index]);
    }
  }

  // console.log(totalLabor2, totalWeight2)

  fgArray.push({
    fg: "TOTAL",
    weight: separator(Math.round(totalWeight)),
    shopLabour: separator(Math.round(totalLabor)),
    poundPerHour: separator(Math.round(totalWeight / totalLabor)),
  });
  for (let obj of fgArray2) {
    fgArray.push(obj);
  }
  fgArray.push({
    fg: "TOTAL",
    weight: separator(Math.round(totalWeight2)),
    shopLabour: separator(Math.round(totalLabor2)),
    poundPerHour: separator(Math.round(totalWeight2 / totalLabor2)),
  });
  console.log(fgArray);
  return (
    <div style={{ maxWidth: "70%" }}>
      <MaterialTable
        title="Rolling Shop Productivity 7/2021"
        icons={tableIcons}
        options={{
          exportAllData: true,
          exportButton: true,
          exportFileName: "Output",
          pageSize: 15,

          pageSizeOptions: [5, 10, 15, 20],
          emptyRowsWhenPaging: true,
        }}
        localization={{
          exportCSVName: "Export as CSV",
        }}
        columns={[
          { title: "Fulfillment Group", field: "fg" },
          { title: "Weight", field: "weight", type: "numeric" },
          { title: "Hours", field: "shopLabour", type: "numeric" },
          { title: "Lb/Hr", field: "poundPerHour", type: "numeric" },
        ]}
        data={fgArray}
      />
    </div>
  );
}

export default App;
