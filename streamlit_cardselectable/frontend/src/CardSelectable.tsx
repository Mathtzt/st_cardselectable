import { BaseProvider, LightTheme } from "baseui"
import React from "react"

import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import {
  ComponentProps,
  withStreamlitConnection,
  StreamlitComponentBase,
  Streamlit,
} from "streamlit-component-lib"
import { Alert, Card, Row } from "react-bootstrap"

// Initialize our Styletron engine
const engine = new Styletron()

interface State {
  /**
   * The value specified by the user via the UI. If the user didn't touch this
   * widget's UI, the default value is used.
   */
  selectedIndex: number
}

/**
 * Radio Button example, using BaseUI.
 */
class CardSelectable extends StreamlitComponentBase<State> {
  public constructor(props: ComponentProps) {
    super(props)
    
    // Determine our initially selected index
    const options = this.props.args["options"] as string[]
    const defaultValue = this.props.args["default"] as number
    let selectedIndex = -1
  
    if (options != null && defaultValue != null) {
      selectedIndex = defaultValue
    }
    
    this.state = { selectedIndex }

    if (selectedIndex !== -1) {
      Streamlit.setComponentValue(options[selectedIndex])
    }
  }

  public render = (): React.ReactNode => {
    const label = String(this.props.args["label"])
    let options = this.props.args["options"] as string[]
    let explanation = this.props.args["explanation"] as string[]
    let defaultValue = this.props.args["default"] as number

    if (options == null || options.length === 0) {
      return (
        <Alert key='size_error' variant="info">
        No options to select.
        </Alert>
      )
    }

    if (explanation.length !== options.length) {
      return (
        <Alert key='size_error' variant="danger">
        The amount of explanatory text differs from the amount of options given.
        </Alert>
      )
    }

    if (defaultValue < 0 || defaultValue > options.length - 1) {
      return (
        <Alert key='size_error' variant="danger">
        Invalid default value index.
        </Alert>
      )
    }

    return (
        <Row className="m-0">
          <label>{label}</label>
          <StyletronProvider value = {engine}>
            <BaseProvider theme={LightTheme}>
              {options.map((option: string, index: number) => (
                <Card style={{ width: '100%', flex: 1 }} className="mb-3"
                  onClick={() => {this.onSelectionChanged(index)}}
                  >
                  <Card.Header className = {this.state.selectedIndex === index ? "cardSelected" : ""}>
                      {option}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text> {explanation[index]} </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </BaseProvider>
          </StyletronProvider>
        </Row>
    )
  }

  private onSelectionChanged = (
    val: number
    // e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const index = val
    this.setState({ selectedIndex: index }, () => {
      // Get the option name at the selected index
      const options = this.props.args["options"] as string[]
      const defaultValue = this.props.args["default"] as number
      let value = null
      value = options != null && index < options.length ? options[index] : null
      console.log("Teste")
      if (defaultValue != null) {
        value = options[defaultValue]
      }
      // Send our current value to Streamlit!
      Streamlit.setComponentValue(value)
    })
  }
}

export default withStreamlitConnection(CardSelectable)