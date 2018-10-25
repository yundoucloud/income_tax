import Taro, { Component } from '@tarojs/taro';
import { View, Picker, Text, Switch } from '@tarojs/components';
import { AtButton, AtInputNumber, AtListItem } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { dispatcher } from '@opcjs/zoro';
import config from '../../common/config/index';
import * as MODELS from '../../constants/models';
import './style.scss';

const settingsDispatcher = dispatcher[MODELS.MODEL_SETTINGS];
const taxDispatcher = dispatcher[MODELS.MODEL_TAX];
@connect(state => ({
  settings: state[MODELS.MODEL_SETTINGS].settings,
  disableCalculate: state[MODELS.MODEL_TAX].disableCalculate,
}))
export default class Settings extends Component {
  config = {
    navigationBarTitleText: '设置'
  };

  handleValue(key, val) {
    settingsDispatcher.set({ key, val });
    taxDispatcher.setDisableCalculate(false); // 更新设置则计算按钮重新enable
  }

  handleEvent(key, e) {
    let val = e.detail.value;
    if (parseFloat(val).toString() !== "NaN") {
      val = parseFloat(val);
    }
    this.handleValue(key, val);
  }

  render() {
    return (
      <View className="index">
        <View >
          <Text>公积金比例(%)</Text>
          <AtInputNumber
            min={5}
            max={7}
            step={1}
            value={this.props.settings.housing}
            onChange={this.handleValue.bind(this, 'housing')}
          />
        </View>
        <View>
          <View>
            <Text>是否有补充公积金</Text>
            <Switch
              checked={this.props.settings.isExistedSupplementaryHousing}
              bindchange={this.handleEvent.bind(this, 'isExistedSupplementaryHousing')}
            />
          </View>
          {this.props.settings.isExistedSupplementaryHousing && <View>
            <Text>补充公积金比例(%)</Text>
            <AtInputNumber
              min={1}
              max={5}
              step={1}
              value={this.props.settings.supplementaryHousing}
              onChange={this.handleValue.bind(this, 'supplementaryHousing')}
            />
          </View>}
        </View>
        <View>
          <Text>是否有首套房贷</Text>
          <Switch
            checked={this.props.settings.isExistedFirstMortgage}
            bindchange={this.handleEvent.bind(this, 'isExistedFirstMortgage')}
          />
        </View>
        <View>
          <Text>是否有子女教育支出</Text>
          <Switch
            checked={this.props.settings.isExistedChildrenEducation}
            bindchange={this.handleEvent.bind(this, 'isExistedChildrenEducation')}
          />
        </View>
        {this.props.settings.isExistedChildrenEducation && <View >
          <Picker mode='selector' range={config.childrenTypes}
            value={this.props.settings.childrenIndex} onChange={this.handleEvent.bind(this, 'childrenIndex')}>
            <AtListItem title='子女类型' extraText={config.childrenTypes[this.props.settings.childrenIndex]} />
          </Picker>
        </View>}
        <View >
          <View>
            <Text>是否存在租房支出</Text>
            <Switch
              checked={this.props.settings.isExistedHouseRent}
              bindchange={this.handleEvent.bind(this, 'isExistedHouseRent')}
            />
          </View>
          {this.props.settings.isExistedHouseRent && <View>
            <Picker mode='selector' range={config.cityTypes}
              value={this.props.settings.houseRentIndex} onChange={this.handleEvent.bind(this, 'houseRentIndex')}>
              <AtListItem title='居住城市的类型' extraText={config.cityTypes[this.props.settings.houseRentIndex]} />
            </Picker>
          </View>}
        </View>
        <View >
          <View>
            <Text>是否赡养超过60岁以上的老人</Text>
            <Switch
              checked={this.props.settings.isExistedElderlyParents}
              bindchange={this.handleEvent.bind(this, 'isExistedElderlyParents')}
            />
          </View>
          {this.props.settings.isExistedElderlyParents && <View>
            <Text>兄弟姐妹的人数</Text>
            <AtInputNumber
              min={1}
              max={500}
              step={1}
              value={this.props.settings.brothersNumber}
              onChange={this.handleValue.bind(this, 'brothersNumber')}
            />
          </View>}
        </View>
        <View >
          <View>
            <Text>是否有继续教育支出</Text>
            <Switch
              checked={this.props.settings.isExistedContinuingEducation}
              bindchange={this.handleEvent.bind(this, 'isExistedContinuingEducation')}
            />
          </View>
          {this.props.settings.isExistedContinuingEducation && <View>
            <Picker mode='selector' range={config.educationTypes}
              value={this.props.settings.continuingEducationIndex}
              onChange={this.handleEvent.bind(this, 'continuingEducationIndex')}>
              <AtListItem title='继续教育的类型' extraText={config.educationTypes[this.props.settings.continuingEducationIndex]} />
            </Picker>
          </View>}
        </View>
        <View>

        </View>
      </View >
    );
  }
}