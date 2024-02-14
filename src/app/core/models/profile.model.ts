/** Required fields for a profile. Used inside the `ProfileCardComponent` */
export interface ProfileBase {
  name: string;
  race: string;
  class: string;
  avatar: string | null;
  level: number;
  shortDescription: string;
}

/** All possible profile fields that can be edited and shown on a profile view page */
export interface Profile extends ProfileBase {
  longDescription: string | null;
  attributes: AttributeSet;
  skills: SkillSet;
}

export type Attribute = number | null;

/** Base character attributes */
export interface AttributeSet {
  strength: Attribute;
  dexterity: Attribute;
  constitution: Attribute;
  intelligence: Attribute;
  wisdom: Attribute;
  charisma: Attribute;
}

/** Proficiencies could be added in the future */
export type Skill = boolean;

/** Skills of a character */
export interface SkillSet {
  acrobatics: Skill;
  athletics: Skill;
  deception: Skill;
  history: Skill;
  insight: Skill;
  intimidation: Skill;
  investigation: Skill;
  medicine: Skill;
  nature: Skill;
  perception: Skill;
  performance: Skill;
  persuasion: Skill;
  religion: Skill;
  sleightOfHand: Skill;
  stealth: Skill;
  survival: Skill;
}
