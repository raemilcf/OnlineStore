
import { DirectoryItemContainer, BackgroundImage, Body, Title, Paragraph } from './directory-item.styles'

const DirectoryItem = ({category}) => {

  const { title, imageUrl} = category;

    return (
        <DirectoryItemContainer>
          <BackgroundImage style={{
            backgroundImage: `url(${imageUrl})`
          }}/>
          <Body>
            <Title>{title}</Title>
            <Paragraph>shop now</Paragraph>
          </Body>
        </DirectoryItemContainer>   
      );
}


export default DirectoryItem;