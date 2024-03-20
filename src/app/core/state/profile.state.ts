import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Profile } from '@app/core/models/profile.model';
import { Injectable } from '@angular/core';

/** Temporary function to generate a random uuid. Should be replaced with a backend service in a real application */
function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export class ProfileStateModel {
  uuid: string;
  profile: Profile | null;

  constructor() {
    this.uuid = generateUUID();
    this.profile = null;
  }
}

export class EditProfile {
  static readonly type = '[Profile] Edit';
  constructor(public payload: Profile) {}
}

export class DeleteProfile {
  static readonly type = '[Profile] Delete';
}

@State<ProfileStateModel>({
  name: 'profile',
})
@Injectable()
export class ProfileState {
  @Selector()
  static getProfile(state: ProfileStateModel) {
    return state.profile;
  }

  @Action(EditProfile)
  editProfile(ctx: StateContext<ProfileStateModel>, action: EditProfile) {
    ctx.patchState({
      profile: action.payload,
    });
  }

  @Action(DeleteProfile)
  deleteProfile(ctx: StateContext<ProfileStateModel>) {
    ctx.patchState({
      profile: null,
    });
  }
}
