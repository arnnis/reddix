import { AppThunk } from "../../store/configureStore";
import { CLIENT_ID, OAUTH_CALLBACK_URL, OAUTH_URL } from "../../env";
import req from "../../utils/req";
import ky from "ky";
import { LoginResult } from "../../models/auth";
import { setToken } from "./slice";
import { history } from "../../index";

export const logInStart = (): AppThunk => (dispatch) => {
  window.location.replace(OAUTH_URL);
};

export const finishLogin = (code: string): AppThunk => async (dispatch) => {
  const fd = new FormData();
  fd.append("code", code);
  fd.append("grant_type", "authorization_code");
  fd.append("redirect_uri", OAUTH_CALLBACK_URL);

  const data = await ky
    .post("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      body: fd,
      headers: {
        Authorization:
          "Basic " + btoa(unescape(encodeURIComponent(CLIENT_ID + ":" + ""))),
      },
    })
    .json<LoginResult>();

  dispatch(
    setToken({
      token: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    })
  );

  history.replace("/");
};

export const refreshToken = (): AppThunk => async (dispatch, getState) => {
  alert("refreshing token...");
  const refreshToken = getState().app.refreshToken;
  if (!refreshToken) {
    dispatch(logOut());
    return;
  }

  const fd = new FormData();
  fd.append("grant_type", "refresh_token");
  fd.append("refresh_token", refreshToken);
  try {
    const data = await ky
      .post("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        body: fd,
        headers: {
          Authorization:
            "Basic " + btoa(unescape(encodeURIComponent(CLIENT_ID + ":" + ""))),
        },
      })
      .json<LoginResult>();

    dispatch(
      setToken({
        token: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      })
    );

    return data;
  } catch (e) {
    if (e.message == 401) {
      dispatch(logOut());
    }
    return false;
  }
};

const logOut = (): AppThunk => (dispatch) => {
  dispatch(
    setToken({
      token: null,
      refreshToken: null,
      expiresIn: null,
      isLoggedIn: false,
    })
  );
};

// import {batch} from 'react-redux';
// import { AppThunk, RootState } from '../../store/configureStore';
// import { storeEntities } from '../entities/slice';

// export const getCurrentUser = (): AppThunk => async (dispatch, getState) => {
//   try {
//     let store: RootState = getState();
//     let currentUser = store.teams.list.find((ws) => ws.id === store.teams.currentTeam)?.userId;

//     let {user}: {user: User} = await http({
//       path: '/users.info',
//       body: {
//         user: currentUser,
//         //include_count: true,
//       },
//       isFormData: true,
//     });

//     batch(() => {
//       dispatch(storeEntities({entity: 'users', data: [user]}));
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const togglePresence = (): AppThunk => async (dispatch, getState) => {
//   let state: RootState = getState();
//   let currentPresence = state.app.presence;
//   let nextPresence = select(currentPresence, {
//     away: 'auto',
//     auto: 'away',
//   });
//   try {
//     let {ok}: {ok: boolean} = await http({
//       path: '/users.setPresence',
//       body: {
//         presence: nextPresence,
//       },
//       isFormData: true,
//       silent: false,
//     });

//     if (ok) {
//       dispatch(setPresence(nextPresence));
//     }

//     return ok;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
