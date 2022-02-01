import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

import text from '../images/text2.PNG';
import search from '../images/search.PNG';
import picture from '../images/picture.PNG';
import comment from '../images/comment2.PNG';
import done from '../images/done.PNG';

function Cards() {
  return (
    <div className='cards'>
      <h1>Features</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={text}
              text='Make detailed notes using a robust text editor'
              label=''
            />
            <CardItem
              src={search}
              text='Find your notes quickly by searching titles and tags'
              label=''
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={picture}
              text='Add useful details by uploading thumbnail images'
              label=''
            />
            <CardItem
              src={comment}
              text='Add quick notes by commenting on your notes'
              label=''
            />
            <CardItem
              src={done}
              text='Keep track of finished and unfinished tasks'
              label=''
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
