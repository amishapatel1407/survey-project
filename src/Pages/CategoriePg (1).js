import React, { useState } from "react";

function CategoriePg() {
  const [showInpt, setShowInpt] = useState(null);

  const [chengeInpt, setChengeInpt] = useState(null);

  const [test, setTest] = useState(null);

  const [rowInput, setrowInput] = useState(null);

  const [row_id, setRow_id] = useState(1);

  const [Categorie_name, setCategorie_name] = useState({});

  const [Categorie_1, setCategorie_1] = useState([]);



  console.log("chengeInpt", chengeInpt);

  const CategorieOne = (row, pId) => {
    console.log("row", row, pId);
    setrowInput({ cId: row, pId: pId });
    setShowInpt(showInpt ? false : true);
    setChengeInpt({ ...chengeInpt, row });
  };
  console.log("setChengeInpt", rowInput);

  const create_Categorie = () => {


    console.log("row_id", rowInput.cId, rowInput.pId);

    Categorie_name.Categorie_1 = chengeInpt;

    console.log("chengeInpt addd one", chengeInpt);

    if (rowInput?.cId === "first") {
      Categorie_1.push({
        id: Categorie_1?.length + 1,
        Categorie_Name: chengeInpt,
        clild: [],
      });
    }
    if (rowInput.cId && !rowInput.pId) {
      for (let i = 1; i <= rowInput?.cId; i++) {
        if (rowInput.cId === i) {
          Categorie_1[i - 1].clild.push({
            id: `${i}${Categorie_1[i - 1]?.clild?.length + 1}`,
            Categorie_Name: chengeInpt,
            clild: [],
            parent_id: i,
          });
        }
        console.log("done row 1", rowInput);
      }
    }

    else if (rowInput.cId && rowInput.pId) {
      for (let i = 1; i <= rowInput?.pId; i++) {
        if (rowInput.pId === i) {
          for (let j = 1; j <= rowInput?.cId; j++) {
            if (rowInput.cId === j) {
              Categorie_1[i - 1].clild[j - 1].clild.push({
                id: `${i}${j}${Categorie_1[i - 1]?.clild[j - 1]?.clild?.length + 1}`,
                Categorie_Name: chengeInpt,
                clild: [],
                parent_id: `${i}${Categorie_1[i - 1]?.clild?.length}`,
              });
            }
          }
          console.log("done row 1", rowInput);
          break;
        }
      }
    }


    setRow_id(row_id);
    setShowInpt(false);
    setTest("");
    setrowInput("")
  };
  console.log("Categorie_name map before", Categorie_1);

  const Categoriedlt = (pId, cId) => {
    console.log("id Categoriedlt", pId);
    console.log("id Categor", cId);
    Categorie_1.map((element) => {
      console.log("element.id", element.id, "pId", pId);
      if (element.id === pId + 1) {
        console.log("pId", pId);
        element.clild.splice(element.clild.cId, 1);
      }
    });
    setTest(test + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            border: "1px solid  black",
            marginRight: "10px",
            padding: "10px",
            fontSize: "25px",
            marginBottom: "25px",
          }}
        >
          Categorie
        </div>
        <button
          style={{ padding: "10px", marginBottom: "25px" }}
          onClick={(row) => CategorieOne((row = "first"))}
        >
          +
        </button>
      </div>

      {showInpt && !Categorie_1 ? (
        <div style={{ marginTop: "15px" }}>
          <input
            style={{ padding: "15px" }}
            placeholder="Categorie name"
            onChange={(e) => setChengeInpt(e.target.value)}
          />
          <button onClick={() => setShowInpt(false)}> Cancel</button>
          <button onClick={create_Categorie} disabled={!chengeInpt}>
            done
          </button>
        </div>
      ) : null}

      <div style={{ display: "flex", flexDirection: "row" }}>
        {Categorie_1?.length > 0
          ? Categorie_1?.map((item, id) => {
            return (
              <div key={id}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: "25px",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid  black",
                      marginRight: "10px",
                      padding: "10px",
                      fontSize: "25px",
                    }}
                  >
                    {item.Categorie_Name}
                  </div>
                  <button
                    style={{ padding: "10px", margin: "5px" }}
                    onClick={() => CategorieOne(item.id)}
                  >
                    +
                  </button>
                  <button
                    style={{ padding: "10px", margin: "5px" }}
                    onClick={() => Categoriedlt()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })
          : null}
        {showInpt && Categorie_1 && rowInput?.cId === "first" ? (
          <div style={{ marginTop: "15px" }}>
            <input
              style={{ padding: "15px" }}
              placeholder="Categorie name"
              onChange={(e) => setChengeInpt(e.target.value)}
            />
            <button onClick={() => setShowInpt(false)}> Cancel</button>
            <button onClick={create_Categorie} disabled={!chengeInpt}>
              done
            </button>
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>



        {Categorie_1?.length > 0
          ? Categorie_1?.map((item, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 0.3,
                    justifyContent: "flex-end",
                    marginRight: "50px",
                    marginTop: "30px",
                  }}
                >
                  {Categorie_1[index]?.clild?.length > 0
                    ? Categorie_1[index]?.clild.map((e, ids) => {
                      ids++;
                      return (
                        <div key={ids}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginRight: "25px",
                            }}
                          >
                            <div
                              style={{
                                border: "1px solid  black",
                                marginRight: "10px",
                                padding: "10px",
                                fontSize: "25px",
                              }}
                            >
                              {e?.Categorie_Name}
                            </div>
                            <button
                              style={{ padding: "10px", margin: "5px" }}
                              onClick={() => CategorieOne(ids, e.parent_id)}
                            >
                              +
                            </button>
                            <button
                              style={{ padding: "10px", margin: "5px" }}
                              onClick={() => Categoriedlt(index, ids)}
                            >
                              Cancel
                            </button>
                          </div>

                          {
                            Categorie_1[index]?.clild[0]?.clild?.length > 0 ?
                              Categorie_1[index]?.clild[0]?.clild.map((e, cids) => {
                                cids++
                                return (
                                  <div>
                                    <div key={cids}>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          marginRight: "25px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            border: "1px solid  black",
                                            marginRight: "10px",
                                            padding: "10px",
                                            fontSize: "25px",
                                          }}
                                        >
                                          {e?.Categorie_Name}
                                        </div>
                                        <button
                                          style={{ padding: "10px", margin: "5px" }}
                                          onClick={() => CategorieOne(ids, e.parent_id)}
                                        >
                                          +
                                        </button>
                                        <button
                                          style={{ padding: "10px", margin: "5px" }}
                                          onClick={() => Categoriedlt(index, ids)}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              }) : null
                          }
                        </div>
                      );
                    })
                    : null}
                </div>
              </div>
            );
          })
          : null}

        {/* ---------------------------working on it ------------------------------------------------------------- */}

        {/* { Categorie_1?.length > 0 ?
          Categorie_1.map((element ,idsed) => {
            return(
              <div>
                <div key={idsed}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flex: 0.3,
                      justifyContent: "flex-end",
                      marginRight: "50px",
                      marginTop: "30px",
                    }}
                  >
                    {Categorie_1[idsed]?.clild?.length > 0
                      ? Categorie_1[idsed]?.clild.map((e, ids) => {
                          ids++;
                          return (
                            <div key={ids}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginRight: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid  black",
                                    marginRight: "10px",
                                    padding: "10px",
                                    fontSize: "25px",
                                  }}
                                >
                                  {e?.Categorie_Name} kgvsvnnv
                                </div>
                                <button
                                  style={{ padding: "10px", margin: "5px" }}
                                  onClick={() => CategorieOne(ids, e.parent_id)}
                                >
                                  +
                                </button>
                                <button
                                  style={{ padding: "10px", margin: "5px" }}
                                  onClick={() => Categoriedlt(idsed, ids)}
                                >
                                  Cancel
                                </button>
                              </div>

                                    {
                            Categorie_1[idsed]?.clild[0]?.clild?.length > 0 ?
                             Categorie_1[idsed]?.clild[0]?.clild.map((e, cids)=>{
                              cids++
                              return(
                                <div>
                                  <div key={cids}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginRight: "25px",
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid  black",
                                    marginRight: "10px",
                                    padding: "10px",
                                    fontSize: "25px",
                                  }}
                                >
                                  {e?.Categorie_Name}hdfjkvndfhbaodh
                                </div>
                                <button
                                  style={{ padding: "10px", margin: "5px" }}
                                  onClick={() => CategorieOne(ids, e.parent_id)}
                                >
                                  +
                                </button>
                                <button
                                  style={{ padding: "10px", margin: "5px" }}
                                  onClick={() => Categoriedlt(idsed, ids)}
                                >
                                  Cancel
                                </button>
                              </div>
                              </div>
                                  </div>
                              )
                             }) :null
                                    }
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            )
            
          })
        :null  } */}


        {showInpt && !rowInput?.pId && rowInput?.cId && typeof (rowInput?.cId) === "number" ? (
          <div style={{ marginTop: "15px" }}>
            <input
              style={{ padding: "15px" }}
              placeholder="Categorie name"
              onChange={(e) => setChengeInpt(e.target.value)}
            />
            <button onClick={() => setShowInpt(false)}> Cancel</button>
            <button onClick={create_Categorie} disabled={!chengeInpt}>
              done  pId
            </button>
          </div>
        ) :

          null}

        {/* chillllld */}
      </div>
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        {showInpt && Categorie_1 && rowInput?.pId && rowInput?.cId && typeof (rowInput?.cId) === "number" ? (
          <div style={{ marginTop: "15px" }}>
            <input
              style={{ padding: "15px" }}
              placeholder="Categorie name"
              onChange={(e) => setChengeInpt(e.target.value)}
            />
            <button onClick={() => setShowInpt(false)}> Cancel</button>
            <button onClick={create_Categorie} disabled={!chengeInpt}>
              done CId
            </button>
          </div>
        ) :

          null}
      </div>
    </div>
  );
}

export default CategoriePg;