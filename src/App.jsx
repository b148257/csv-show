import React, { Component } from 'react';
import { Input, Select, Carousel, Form, Row, Col, Button, Card } from 'antd';
import { CSVReader } from 'react-papaparse';
import _uniq from 'lodash/uniq';

import './App.css';

const FormItem = Form.Item;
const { Option } = Select;

export default class App extends Component {
  state = {
    header: [],
    table: [],
    uids: [],
    visittimes: {},
    labels: {},

    uid: '',
    visittime: '',

    display: false,
  };

  handleChange = (data) => {
    console.log(data);
    const header = data[0].data;

    const table = data
      .slice(1)
      .filter((item) => item.data.length !== 1)
      .map((item) => {
        return item.data;
      });

    const uids = table.map((row) => row[0]);
    const visittimes = table.reduce((prev, cur) => {
      const uid = cur[0],
        visittime = cur[1];

      if (!prev[uid]) {
        prev[uid] = [];
      }
      if (prev[uid].includes(visittime)) {
        return prev;
      } else {
        prev[uid].push(visittime);
      }

      return prev;
    }, {});

    const labels = table.reduce((prev, cur) => {
      const uid = cur[0],
        visittime = cur[1],
        label = cur[2];

      if (!prev[uid]) {
        prev[uid] = {};
      }

      if (!prev[uid][visittime]) {
        prev[uid][visittime] = [];
      }

      if (prev[uid][visittime].includes(label)) {
        return prev;
      } else {
        prev[uid][visittime].push(label);
      }

      return prev;
    }, {});

    console.log(labels);

    this.setState({ header, table, uids, visittimes, labels });
  };

  handleClick = () => {
    this.setState({ display: true });
  };

  renderItem(title, value, width = '33.3%') {
    return (
      <div className="item" style={{ width }}>
        <div className="item-title">{title}</div>
        <div className="item-value">{value}</div>
      </div>
    );
  }

  render() {
    const { uid, visittime } = this.state;

    const label = (this.state.labels[uid] && this.state.labels[uid][visittime]) || '';

    const rows = this.state.table.filter((row) => row[0] === uid && row[1] === visittime);

    return (
      <div style={{ minWidth: 900, padding: '30px' }}>
        <div style={{ height: '164px' }}>
          <CSVReader className="csv" noDrag addRemoveButton onFileLoad={this.handleChange}>
            <span>click to select CSV file</span>
          </CSVReader>
        </div>

        <div className="title">
          <div>
            <Form
              layout={{
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
              }}
            >
              <Row gutter={20}>
                <Col span={6}>
                  <FormItem
                    label="Uid"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Uid!',
                      },
                    ]}
                  >
                    <Select value={uid} showSearch onChange={(v) => this.setState({ uid: v })}>
                      {_uniq(this.state.uids).map((item) => (
                        <Option key={item}>{item}</Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    label="visittime"
                    rules={[
                      {
                        required: true,
                        message: 'Please select visittime!',
                      },
                    ]}
                  >
                    <Select value={visittime} onChange={(v) => this.setState({ visittime: v })}>
                      {this.state.visittimes[uid]
                        ? this.state.visittimes[uid].map((time) => (
                            <Option key={time} value={time}>
                              {time}
                            </Option>
                          ))
                        : []}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="label">
                    <Input value={label} />
                  </FormItem>
                </Col>
                <Col>
                  <Button type="primary" disabled={!label} onClick={this.handleClick}>
                    确定
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        {!this.state.display && (
          <div className="display">
            <div className="left">
              {this.renderItem('ts', '', '100%')}
              <div style={{ height: '30px' }}></div>
              {this.renderItem('pagecode', '', '100%')}
            </div>
            <div className="right"></div>
          </div>
        )}

        {!!rows.length && this.state.display && (
          <Carousel effect="fade" autoplay autoplaySpeed={2000} pauseOnFocus={false} pauseOnHover={false}>
            {rows.map((row) => {
              return (
                <div className="display">
                  <div className="left">
                    {this.renderItem('ts', row[4], '100%')}
                    <div style={{ height: '30px' }}></div>
                    {this.renderItem('pagecode', row[3], '100%')}
                  </div>
                  <div className="right">
                    {row.slice(6).map((item, index) => this.renderItem(this.state.header[6 + index], item))}
                    <div className="y-container">
                      y: <div className="y-value">{row[5]}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>
    );
  }
}
