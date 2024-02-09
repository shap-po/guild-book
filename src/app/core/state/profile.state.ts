import { State, Action, StateContext } from '@ngxs/store';
import { Profile } from '@app/core/models/profile.model';

/** Temporary function to generate a random uuid. Should be replaced with a backend service in a real application */
function randomUuid() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}

export interface ProfileStateModel {
  profile: Profile;
}

export class CreateProfile {
  static readonly type = '[Profile] Create';
  // profile without id
  constructor(public payload: Omit<Profile, 'uuid'>) {}
}

export class EditProfile {
  static readonly type = '[Profile] Edit';
  constructor(public payload: Partial<Profile>) {}
}

@State<ProfileStateModel>({
  name: 'profile',
})
export class ProfileState {
  @Action(CreateProfile)
  createProfile(ctx: StateContext<ProfileStateModel>, action: CreateProfile) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      profile: {
        ...action.payload,
        uuid: randomUuid(),
      },
    });
  }

  @Action(EditProfile)
  editProfile(ctx: StateContext<ProfileStateModel>, action: EditProfile) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      profile: {
        ...state.profile,
        ...action.payload,
      },
    });
  }
}
