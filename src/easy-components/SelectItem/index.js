/* eslint-disable react/prop-types */
import React from 'react';
import {
  FiCheckCircle as SelectedIcon,
  FiCircle as UnselectedIcon,
} from 'react-icons/all';

import {
  Container,
  Content,
  BarColor,
  Footer,
  RightPanel,
  LeftPanel,
  Header,
  Body,
  Selection,
} from './styles';

import AuxInfo from '../AuxInfo';
import ImageViewer from '../ImageViewer';

function SelectItem({
  barColor,
  imageSrc,
  leftPanel,
  rightPanel,
  children,
  auxInfo,
  header,
  isBorderBottom,
  selected,
  isShowSelection = false,
}) {
  return (
    <Container isBorderBottom={isBorderBottom}>
      <BarColor color={barColor} />
      {imageSrc && (
        <ImageViewer
          src={imageSrc}
          width={80}
          height={80}
          style={{ marginLeft: '20px' }}
        />
      )}
      {leftPanel && <LeftPanel>{leftPanel}</LeftPanel>}
      <Content>
        {header && (
          <Header>
            <AuxInfo text={header} direction="row" />
          </Header>
        )}
        <Body>{children}</Body>
        <AuxInfo text={auxInfo} />
        <Footer />
      </Content>
      {rightPanel && <RightPanel>{rightPanel}</RightPanel>}
      {isShowSelection && (
        <Selection>
          {selected ? (
            <SelectedIcon size={20} color="#999" />
          ) : (
            <UnselectedIcon size={20} color="#999" />
          )}
        </Selection>
      )}
    </Container>
  );
}

export default SelectItem;
