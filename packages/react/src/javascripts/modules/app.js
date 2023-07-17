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

const MAX_HEIGHT = 2000
const API_ENDPOINTS = {
  organizations: '/api/v2/organizations.json'
}
const StyledContainer = styled.div`
  margin-bottom: ${p => p.theme.space.xl};
  min-width: 500px;
`;
const StyledField = styled(Field)`
  margin-top: ${p => p.theme.space.xs};
`;


class App {
  constructor (client, _appData) {
    this._client = client

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init () {
    const currentUser = (await this._client.get('currentUser')).currentUser

    I18n.loadTranslations(currentUser.locale)

    const organizationsResponse = await this._client
      .request(API_ENDPOINTS.organizations)
      .catch(this._handleError.bind(this))

    const organizations = organizationsResponse ? organizationsResponse.organizations : []

    const appContainer = document.querySelector('.main')
    console.log('Rendering app into container', appContainer)

    render(
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
    <StyledContainer>
      <Grid>
        <Row>
          <Col>
            <form>
              <Field>
                <Label>Serial Number</Label>
                <Input placeholder="ERP Serial Number." />
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
                    <MdAddBox size={40} color="black" href=''/>
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
        </Body>
      </Table>
      <hr></hr>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Title>Sold To</Title>
            <Input type="text" value="3166A" readOnly />
          </Col>
          <Col>
            <Title>Ship To</Title>
            <Input type="text" value="3166A" readOnly />
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <Title>Active Contract</Title>
            <Input type="text" value="9893" readOnly />
            </Col>
    <Col>
      <Field>
        <Checkbox defaultChecked>
          <Label>Materials</Label>
          <Hint>Materials Found?</Hint>
        </Checkbox>
      </Field>
      <StyledField>
        <Checkbox>
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
