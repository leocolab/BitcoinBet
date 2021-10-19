import React, { Component } from 'react';
import styled from "styled-components";
import getBlockchain from './ethereum.js';
import { useState, useEffect } from 'react';

// contract addy:   0x2165E172E6Aa2ceE94E022e97029DAfF154d449f


function App () {

  const [value, setValue] = useState(undefined);
  const [MakeBet, setMakeBet, signer] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { MakeBet } = await getBlockchain();
      const value = await MakeBet.returnValue();
      setMakeBet(MakeBet);
      setValue(value);
    };
    init();
  }, []);

   

  const prize = async e => {
    const tx = await MakeBet.receivePrize();
    await tx.wait();
  }

  const intitialSupply = async e => {
    e.preventDefault();
    const IS = e.target.elements[0].value;
    const tx = await MakeBet.TEST2(IS);
    await tx.wait();
  }

  const receive = async () => {
    const tx = await MakeBet.receivePrize();
    await tx.wait();
  }

  if(
    typeof MakeBet === 'undefined'
    || typeof value === 'undefined'
  ) {
    return 'Loading...';
  }

  return (
    <div className='col-sm-50'>
      <h2 style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '30%',
        textAlign: 'center',
        transform: 'translate(-50%, -175%)'}}>Bet on the price of Ether 
        being above $1700 USD in 10 seconds and receive tokens! </h2>
        <form className="form-inline" onSubmit={e => intitialSupply(e)} >
          <input 
              type="text" 
              className="form-control" 
              placeholder="Set Initial Supply"
            />
            <p style={{ 
        position: 'absolute', 
        left: '4%', 
        top: '8%',
        transform: 'translate(-10%, -5%)'}}> (You must be the owner to do this) </p>
          <button type="submit" >
          Submit
          </button>
          <button onClick={() => receive()} style={{backgroundColor: "#FFFF",
          color: "#42C47A",
          fontSize: 24,
          fontStyle: "Oblique",
          borderRadius: 10,
          borderWidth: 8,
          borderColor: "#42C47A",  
          position: 'absolute', 
          left: '68%', 
          top: '50%',
          transform: 'translate(-200%, +200%)'
      }} >
          Receive Prize
          </button>
          <h3 style={{ 
        position: 'absolute', 
        left: '46.5%', 
        top: '40%',
        transform: 'translate(-10%, -5%)'}}> You have bet </h3>
          <h2 style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '45%',
        transform: 'translate(-10%, -5%)'}}>{value.toString()}</h2>
        <h3 style={{ 
        position: 'absolute', 
        left: '49%', 
        top: '50%',
        transform: 'translate(-10%, -5%)'}}> Wei </h3>
        <h5 style={{ 
        position: 'absolute', 
        left: '30%', 
        top: '30%',
        textAlign: 'center',
        transform: 'translate(-10%, -5%)'}}> Send your bet to address 0x2165E172E6Aa2ceE94E022e97029DAfF154d449f </h5>
        </form>
    </div> 

  );
}


  
  

export default App;
