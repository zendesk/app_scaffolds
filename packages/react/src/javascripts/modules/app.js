import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming'
import styled from 'styled-components';
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { UnorderedList } from '@zendeskgarden/react-typography'
import { SM, LG } from '@zendeskgarden/react-typography';
import I18n from '../../javascripts/lib/i18n'
import { resizeContainer, escapeSpecialChars as escape } from '../../javascripts/lib/helpers'
import { Input, MediaInput, Field, Hint, Label, Message, FauxInput, Checkbox } from '@zendeskgarden/react-forms'
import { MdAddBox } from 'react-icons/md';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { Well, Title } from '@zendeskgarden/react-notifications';
import { Body, Cell, Head, HeaderCell, HeaderRow, Table, Caption } from '@zendeskgarden/react-tables';


//a4349f033729446dec00496e812533d4a10ff7470f5a8e7b32b1a2c107f200f8

const MAX_HEIGHT = 2000
const StyledContainer = styled.div`
  margin-bottom: ${p => p.theme.space.xl};
  min-width: 500px;
`;
const StyledField = styled(Field)`
  margin-top: ${p => p.theme.space.xs};
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [], // Initialize tableData state with an empty array
      zenSerialNum: '',
    };
    this._client = ZAFClient.init();
    this.initializePromise = this.init();
  }

  async componentDidMount() {
    // Call the init method here to perform the initialization once the component is mounted
    await this.initData();
  }

  async initData() {
    try {
      // Fetch initial data
      const data = await this._client.get('ticket');
      const { id: ticketID, subject: ticketDesc, comments } = data.ticket;
      const strippedComm = comments[1].value.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&');

      console.log(data);

      const zenSerialNumRep = await this._client.get('ticket.customField:custom_field_360015798500');
      const zenSerialNum = zenSerialNumRep['ticket.customField:custom_field_360015798500'];

      this.setState({
        tableData: [],
        zenSerialNum,
      });
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }

  handleMdAddBoxClick = async () => {
    try {
      const serialNum = this.state.zenSerialNum; // Use state value here
      const url = `https://uksouthdtpilot01.epicorsaas.com/saas513pilot/api/v1/BaqSvc/getSerialNumberData_workato`;

      const response = await fetch(`${url}?SerialNo=${serialNum}`, {
        headers: {
          Authorization: `Basic YWFyb25nOlBlbnNhbnMzODk0`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Received data from API:', data);
        this.setState({ tableData: [data] });
      } else {
        console.error('Failed to fetch data:', response);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  async init() {
    //const currentUser = (await this._client.get('currentUser')).currentUser;
    //I18n.loadTranslations(currentUser.locale);
    //const organizationsResponse = await this._client.request(API_ENDPOINTS.organizations).catch(this._handleError.bind(this));
    //const organizations = organizationsResponse ? organizationsResponse.organizations : [];
    const appContainer = document.querySelector('.main');

    render(
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
    <StyledContainer>
      <Grid>
        <Row>
          <Col>
            <form>
            <Field>
              <Label>Serial Number</Label>
              {this.state.zenSerialNum ? (
                <Input type="text" value={this.state.zenSerialNum} readOnly />
              ) : (
                <Input type="text" value="No data found" readOnly />
              )}
            </Field>
            </form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <form>
              <Field>
                <Label>Linked Case</Label>
                <Row>
                  <Col size="auto">
                    <Input placeholder="ERP Case Number." />
                  </Col>
                  <Col size="auto">
                  <div onClick={this.handleMdAddBoxClick}>
                    <MdAddBox size={40} color="black" />
                  </div>
                </Col>
                </Row>
              </Field>
            </form>
          </Col>
        </Row>
        <Row>
          <Col>

          <Table style={{ minWidth: 500 }}>
        <Head>
          <HeaderRow>
            <HeaderCell>Packing Slip</HeaderCell>
            <HeaderCell>Ship Date</HeaderCell>
            <HeaderCell>Invoiced</HeaderCell>
          </HeaderRow>
        </Head>
        <Body>
                    {this.state.tableData.map((rowData, index) => (
                      <Row key={index}>
                        <Cell>{rowData.SerialNo_PartNum}</Cell>
                        <Cell>{rowData.ShipHead_ShipDate}</Cell>
                        <Cell>{rowData.SerialNo_SNStatus}</Cell>
                      </Row>
                    ))}
        </Body>
      </Table>
      <hr></hr>
          </Col>
        </Row>
        <br />
        <Row>
        <Col>
                <Title>Sold To</Title>
                {this.state.tableData.length > 0 && this.state.tableData[0].Customer_CustID ? (
                  <Input type="text" value={tableData[0].Customer_CustID} readOnly />
                ) : (
                  <Input type="text" value="No data found" readOnly />
                )}
              </Col>
              <Col>
                <Title>Ship To</Title>
                {this.state.tableData.length > 0 && this.state.tableData[0].ShipTo_ShipToNum ? (
                  <Input type="text" value={this.state.tableData[0].ShipTo_ShipToNum} readOnly />
                ) : (
                  <Input type="text" value="No data found" readOnly />
                )}
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Title>Active Contract</Title>
                {this.state.tableData.length > 0 && this.state.tableData[0].FSContSN_ContractNum ? (
                  <Input type="text" value={this.state.tableData[0].FSContSN_ContractNum} readOnly />
                ) : (
                  <Input type="text" value="No active contract found" readOnly />
                )}
              </Col>
              <Col>
                <Field>
                  <Checkbox defaultChecked={this.state.tableData.length > 0 && this.state.tableData[0].Calculated_Material}>
                    <Label>Materials</Label>
                    <Hint>Materials Found?</Hint>
                  </Checkbox>
                </Field>
                <StyledField>
                  <Checkbox defaultChecked={this.state.tableData.length > 0 && this.state.tableData[0].Calculated_Labour}>
                    <Label>Labour</Label>
                    <Hint>Labour Found?</Hint>
                  </Checkbox>
                </StyledField>
              </Col>
            </Row>
          </Grid>
        </StyledContainer>
      </ThemeProvider>,
      appContainer
    )
    return resizeContainer(this._client, MAX_HEIGHT)
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError (error) {
    console.log('An error is handled here: ', error.message)
  }
}

export default App
