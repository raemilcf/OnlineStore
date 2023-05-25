import { FC } from 'react';

import {useNavigate } from 'react-router-dom';
import { DirectoryCategory } from '../directory/directory.component';

import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles'

type CategoryProps = {

  category : DirectoryCategory;
 
} 

const DirectoryItem : FC<CategoryProps> = ({category}) => {

  const { title, imageUrl, route} = category;
  const navigate = useNavigate();

  const onNaviagateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNaviagateHandler}>
          <BackgroundImage imageUrl={imageUrl}/>
          <Body>
            <h2>{title}</h2>
            <p>shop now</p>
          </Body>
        </DirectoryItemContainer>   
      );
}


export default DirectoryItem;