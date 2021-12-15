/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { sendData } from '~/store/modules/log/actions';
// eslint-disable-next-line import/no-cycle
import CustomTabs from '~/easy-components/TabContent/CustomTabs';
import Content from '../Content';
import CustomIcon from '../Icon';
import { Header, Tab, Container } from './styles';
import { colors } from '../styles';

function TabContent(
  {
    backgroundColor,
    tabColor = colors.tabColor,
    selectedColor = colors.tabColorActive,
    children,
    settings,
    formRef,
    customTabsSettings = {},
    onChangeTab,
    headerPosition = 'top',
    activeTab: activeTabProp = 0,
  },
  ref
) {
  const dispatch = useDispatch();

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const oldActiveTabRef = useRef(activeTabProp);

  const { fields } = settings || {};

  function onSelectTab(idx) {
    if (idx !== activeTab) {
      setActiveTab(idx);
      if (onChangeTab)
        onChangeTab(tabs[idx].props, idx, oldActiveTabRef.current);
      oldActiveTabRef.current = idx;
    }
  }

  useImperativeHandle(ref, () => {
    return {
      setActiveTab: tabName => {
        const index = tabs.findIndex(tab => tab.props.name === tabName);
        onSelectTab(index);
      },
    };
  });

  const getCustomTabs = useCallback(() => {
    if (settings && settings.components) {
      const customTabs = settings.components.filter(
        component => component.type === 'tab'
      );

      return customTabs.map(tab => {
        return (
          <CustomTabs
            key={tab.name}
            name={tab.name}
            title={tab.title}
            icon={tab.icon}
            userFields={tab.userFields}
            columns={tab.columns}
            formRef={formRef}
            settings={settings}
            isReadOnly={customTabsSettings.isReadOnly}
          />
        );
      });
    }

    return null;
  }, [customTabsSettings.isReadOnly, formRef, settings]);

  useEffect(() => {
    let itemTabs = [];
    const customTabs = getCustomTabs();

    if (Array.isArray(children)) {
      children.forEach(tab => {
        if (Array.isArray(tab)) {
          tab.forEach(item => {
            if (item) itemTabs.push(item);
          });
        } else if (tab) itemTabs.push(tab);
      });

      if (customTabs) itemTabs = [...itemTabs, ...customTabs];

      setTabs(itemTabs);

      // setTabs(children);
    } else {
      children.forEach(tab => {
        if (Array.isArray(tab)) {
          tab.forEach(item => {
            if (item) itemTabs.push(item);
          });
        } else if (tab) itemTabs.push(tab);
      });

      if (customTabs) itemTabs = [...itemTabs, ...customTabs];

      setTabs(itemTabs);
    }
  }, [children, getCustomTabs]);

  useEffect(() => {
    setActiveTab(activeTabProp);
  }, [activeTabProp]);

  return (
    <Container headerPosition={headerPosition}>
      <Header headerPosition={headerPosition}>
        {tabs.map((tab, idx) => {
          let Icon = '';
          if (typeof tab.props.icon !== 'function') {
            Icon = (
              <CustomIcon
                name={tab.props.icon}
                size={32}
                color={idx === activeTab ? selectedColor : tabColor}
              />
            );
          } else {
            const ObjIcon = tab.props.icon;
            Icon = (
              <ObjIcon
                size={32}
                color={idx === activeTab ? selectedColor : tabColor}
              />
            );
          }

          const selfField =
            (fields ? fields.find(f => f.name === tab.props.name) : {}) || {};

          return (
            <Tab
              headerPosition={headerPosition}
              hidden={selfField.hidden || tab.props.hidden || false}
              key={idx}
              onClick={() => onSelectTab(idx)}
              tabColor={tabColor}
              selectedColor={selectedColor}
              selected={idx === activeTab}
              onMouseEnter={() => {
                dispatch(
                  sendData({
                    baseName: null,
                    name: tab.props.name,
                    value: null,
                  })
                );
              }}
            >
              {tab.props.icon && Icon}
              <span>{tab.props.title}</span>
            </Tab>
          );
        })}
        <Tab
          headerPosition={headerPosition}
          style={{ flex: 1 }}
          hidden={false}
          phantom
          onClick={() => {}}
          tabColor={tabColor}
          selectedColor={selectedColor}
          selected={false}
          onMouseEnter={() => {}}
        >
          <span />
        </Tab>
      </Header>
      {tabs.map((tab, idx) => (
        <Content
          key={idx}
          visible={idx === activeTab}
          backgroundColor={backgroundColor}
        >
          {tab}
        </Content>
      ))}
    </Container>
  );
}

TabContent.propTypes = {
  settings: PropTypes.shape(),
  customTabsSettings: PropTypes.shape(),
  selectedColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  formRef: PropTypes.shape().isRequired,
  tabColor: PropTypes.string,
};

TabContent.defaultProps = {
  tabColor: colors.tabColor,
  selectedColor: colors.tabColorActive,
  backgroundColor: '#f9f9f9',
  settings: {},
  customTabsSettings: {},
};

export default forwardRef(TabContent);
