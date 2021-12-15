/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import ImageViewer from '~/easy-components/ImageViewer';
// import compareRender from '~/easy-components/Helpers/compareRender';

import {
  Container,
  Content,
  ContentAttributes,
  Attribute,
  Title,
  Description,
  Informations,
  Image,
  HiderShow,
  Panel,
} from './styles';

function HeaderContent({
  title,
  informations,
  description,
  attributes,
  height,
  icon,
  image,
}) {
  const [isShow, setIsShow] = useState(true);
  return (
    <Container>
      <Panel isShow={isShow} height={height}>
        {icon && <Image>{icon}</Image>}
        {image && <ImageViewer src={image} alt="" height="70px" width="80px" />}
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Informations>
            {informations.map((attr, idx) => (
              <Attribute key={`info-attr-${idx}`}>{attr}</Attribute>
            ))}
          </Informations>
        </Content>
        {attributes.length > 0 && (
          <ContentAttributes>
            {attributes.map((attr, idx) => (
              <Attribute key={`header-attr-${idx}`}>{attr}</Attribute>
            ))}
          </ContentAttributes>
        )}
      </Panel>
      <HiderShow>
        <div onClick={() => setIsShow(!isShow)}>
          {isShow ? (
            <RiArrowUpSLine size={20} color="#fff" />
          ) : (
            <RiArrowDownSLine size={20} color="#fff" />
          )}
        </div>
      </HiderShow>
    </Container>
  );
}

HeaderContent.propTypes = {
  image: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  attributes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(),
      PropTypes.string,
      PropTypes.element,
      PropTypes.number,
    ])
  ),
  informations: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(),
      PropTypes.string,
      PropTypes.element,
      PropTypes.number,
    ])
  ),
  icon: PropTypes.shape(),
};

HeaderContent.defaultProps = {
  height: null,
  attributes: [],
  informations: [],
  title: null,
  description: null,
  icon: null,
  image: null,
};

// export default compareRender(HeaderContent, [], ['informations']);
export default HeaderContent;
