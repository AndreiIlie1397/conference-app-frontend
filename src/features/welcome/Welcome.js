import React, { useState, useCallback } from 'react'
import { Typography, Grid, InputAdornment } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field';
import CustomIconButton from '@bit/totalsoft_oss.react-mui.icon-button';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { emptyString } from 'utils/constants';
import { useEmail } from 'hooks/useEmail';
import { validateEmail } from 'utils/functions';

function Welcome() {
  const { t } = useTranslation()
  const [email, setEmail] = useEmail()
  const [inputValue, setInputValue] = useState(email)
  const [isValid, setIsValid] = useState(true)

  const handleInputChange = useCallback(e => setInputValue(e.target.value), [])
  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(inputValue)
    setEmail(isEmailValid ? inputValue : emptyString)
    setIsValid(isEmailValid)
  }, [setEmail, inputValue])
  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 13) {
        handleButtonClick()
      }
    },
    [handleButtonClick]
  )

  return (
    <Grid container direction="column" alignItems="center" spacing={10}>
      <Grid item>
        <Typography variant="h5">{t("LandingPage.Title")}</Typography>
      </Grid>

      <Grid item container justify="center" alignContent="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <Typography variant="caption">{t("LandingPage.Subtitle")}</Typography>
        </Grid>

        <Grid item>
          <CustomTextField
            fullWidth
            endAdornment={
              <InputAdornment position='end'>
                <CustomIconButton size='small' aria-label='go' onClick={handleButtonClick}>
                  <KeyboardReturnIcon fontSize='small' />
                </CustomIconButton>
              </InputAdornment>
            }
            onKeyDown={handleKeyDown}
            debounceBy={0}
            value={inputValue}
            onChange={handleInputChange}

            helperText={!isValid && t("LandingPage.BadEmail")}
            error={!isValid}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Welcome
