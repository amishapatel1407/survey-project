import { render } from '@testing-library/react';
import React, { useState } from 'react'
import { Children } from 'react';
import './category.css'
export default function Categoryhierarchy() {
  const [input, setinput] = useState(null)
  const [state, setstate] = useState([])
  console.log("state======>", state);
  const [answer, setAnswer] = useState(null)
  const [subinput, setSubinput] = useState(null)
  console.log("subinput=>", subinput);
  const [subanswer, setSubanswer] = useState(null)
  console.log("subanswer======>", subanswer);
  const [id, setid] = useState(null)
  console.log("id=======>", id);
  const [firstRow, setFirstRow] = useState(null)

  const addcategory = (row) => {
    setFirstRow(row)
    setinput(true)

  }

  const done = (e,) => {
    if (firstRow == 'first' && answer) {
      setinput(false)
      state.push({ category: answer, child: [] })
      setFirstRow(null)
      setAnswer(null)
    }
    else if (id !== null) {
      state.map((data, index) => {
        if (index + 1 == id) {
          state[index].child.push({ subcategory: subanswer, subchild: [] })
        }
        setid(null)
      })
      setSubinput(false)
    }

  }
  const deletecategory = (categoryname) => {
    console.log("categoryname=====>", categoryname);
    if (categoryname) {

      state.splice(state.findIndex(s => s.category === categoryname), 1)
      setAnswer({ ...state })
    }

  }

  const addsubcategory = (index) => {

    if (index) {
      setSubinput(true)
      setid(index)
    }
    else if (id == null) {
      setSubinput(true)

    }
  }


  return (
    <div>
      <h1>category</h1>
      <div className='categorywraper'>
        <div className='category'>
          category
        </div>
        <div>
          <button onClick={(row) => addcategory((row = 'first'))} className='addbtn'>+</button>
        </div>
      </div>
      <div className='amisha'>

        {
          state ?
            <div className='categorywraper'>
              {
                state.map((category, index) => {
                  const categoryname = category?.category
                  return (
                    <>
                      <div className='category' style={{ backgroundColor: 'orange', color: 'white', border: '1px solid orange' }}>
                        {categoryname}
                      </div>
                      <div>
                        <button onClick={() => addsubcategory(index + 1)} className='addbtn'>+</button>
                        <button style={{ padding: 10 }} onClick={() => deletecategory(categoryname)}>delete</button>
                      </div></>

                  )
                })
              }

            </div>

            : ''}
        {input ?
          <div className='input'>
            <input name='category' onChange={(e) => setAnswer(e.target.value)} style={{ padding: 10 }} type="text" />
            <button onClick={() => setinput(false)}>Cancel</button>
            <button disabled={!answer} onClick={(first) => done(first = 'firstRow')}>first done</button>

          </div>

          : null}
      </div>

      <div className='amisha1' style={{ marginRight: '40%' }}>
        {
          state ?
            <div className='category2'>
              {
                state?.map((category) => (
                  category.child ?
                    <div className='categorywraper' >
                      {
                        category.child?.map((c, index) => {
                          return (
                            <>
                              <div className='category' style={{ backgroundColor: 'green', color: 'white', border: '1px solid green' }}>
                                {c?.subcategory}
                              </div>
                              <div>
                                <button onClick={() => addsubcategory()} className='addbtn'>+</button>
                                <button style={{ padding: 10 }} onClick={() => deletecategory()}>delete</button>
                              </div></>
                          )
                        })
                      }

                    </div>
                    : null
                ))
              }

            </div>
            : null
        }

        {subinput && id ?
          <div>
            <div className='input' style={{ marginRight: '10%' }}>
              <input name='subcategory' onChange={(e) => setSubanswer(e.target.value)} style={{ padding: 10 }} type="text" />
              <button onClick={() => setSubinput(false) && setid(null)}>Cancel</button>
              <button onClick={done}> second done</button>

            </div>

          </div>
          : null}

      </div>

      {subinput && id == null ?
        <div>
          <div className='input' style={{ marginRight: '10%' }}>
            <input name='subcategory' onChange={(e) => setSubanswer(e.target.value)} style={{ padding: 10 }} type="text" />
            <button onClick={() => setSubinput(false)}>Cancel</button>
            <button onClick={done}> third done</button>

          </div>

        </div>
        : null}

    </div>
  )
}
