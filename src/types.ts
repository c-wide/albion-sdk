import type {
  EAST_API_URL,
  EAST_STATUS_URL,
  WEST_API_URL,
  WEST_STATUS_URL,
} from "./config.ts"

export type Server = "west" | "east"

export type ServerAPIURL = typeof WEST_API_URL | typeof EAST_API_URL

export type ServerStatusURL = typeof WEST_STATUS_URL | typeof EAST_STATUS_URL

export type StandardTimeRange = "week" | "month" | "lastWeek" | "lastMonth"

export type SortOptions = "totalfame" | "recent"

export type ServerStatus = "online" | "offline" | "starting"

export type ServerStatusResponse = {
  status: ServerStatus
  message: string
}

export type PaginationParams = {
  limit?: number
  offset?: number
}

export type TopAndSoloKillsParams = {
  range?: StandardTimeRange
} & PaginationParams

export type BattleParams = {
  range?: StandardTimeRange
  sort?: SortOptions
} & PaginationParams

export type RenderItemParams = {
  enchantment?: Range<0, 4>
  quality?: Range<0, 5>
  size?: Range<1, 217>
  locale?: string
}

export type RenderSpellParams = {
  size?: Range<1, 217>
  locale?: string
}

export type RenderDestinyBoardParams = {
  locale?: string
}

export type RenderGuildLogoParams = {
  symbol: `GUILDSYMBOL_${string}`
  symbolColor: Range<0, 14>
  schema: `SCHEMA_${string}`
  primarySchemaColor: Range<0, 14>
  secondarySchemaColor: Range<0, 14>
  type: `ACTIVE_{string}` | `PASSIVE_{string}`
  size?: number
  symbolScale?: number
  symbolOffsetY?: number
  gems?: number
}

export type SearchResponse = {
  guilds: Array<SearchGuild>
  players: Array<SearchPlayer>
}

export type SearchGuild = {
  Id: string
  Name: string
  AllianceId: string
  AllianceName: string
  KillFame: number | null
  DeathFame: number
}

export type SearchPlayer = {
  Id: string
  Name: string
  GuildId: string
  GuildName: string | null
  AllianceId: string
  AllianceName: string
  Avatar: string
  AvatarRing: string
  KillFame: number
  DeathFame: number
  FameRatio: number
  totalKills: number | null
  gvgKills: number | null
  gvgWon: number | null
}

export type Player = {
  AverageItemPower: number
  Equipment: Equipment
  Inventory: Array<Armor | null>
  Name: string
  Id: string
  GuildName: string
  GuildId: string
  AllianceName: string
  AllianceId: string
  AllianceTag: string
  Avatar: string
  AvatarRing: string
  DeathFame: number
  KillFame: number
  FameRatio: number
  LifetimeStatistics: LifetimeStatistics
}

export type Equipment = {
  MainHand: Armor | null
  OffHand: Armor | null
  Head: Armor | null
  Armor: Armor | null
  Shoes: Armor | null
  Bag: Armor | null
  Cape: Armor | null
  Mount: Armor | null
  Potion: Armor | null
  Food: Armor | null
}

export type LegendarySoul = {
  id: string
  subtype: number
  era: number
  name: null
  lastEquipped: string
  attunedPlayer: string
  attunedPlayerName: string
  attunement: number
  attunementSpentSinceReset: number
  attunementSpent: number
  quality: number
  craftedBy: string
  traits: Trait[]
  PvPFameGained: number
}

export type Trait = {
  roll: number
  pendingRolls: Array<unknown>
  pendingTraits: Array<unknown>
  value: number
  trait: string
  minvalue: number
  maxvalue: number
}

export type Armor = {
  Type: string
  Count: number
  Quality: number
  ActiveSpells: Array<never>
  PassiveSpells: Array<never>
  LegendarySoul: LegendarySoul | null
}

export type LifetimeStatistics = {
  PvE: PVE
  Gathering: Gathering
  Crafting: Crafting
  CrystalLeague: number
  FishingFame: number
  FarmingFame: number
  Timestamp: string | null
}

export type Crafting = {
  Total: number
  Royal: number
  Outlands: number
  Avalon: number
}

export type Gathering = {
  Fiber: Crafting
  Hide: Crafting
  Ore: Crafting
  Rock: Crafting
  Wood: Crafting
  All: Crafting
}

export type PVE = {
  Total: number
  Royal: number
  Outlands: number
  Avalon: number
  Hellgate: number
  CorruptedDungeon: number
  Mists: number
}

export type EventParticipant = Player & {
  DamageDone: number
  SupportHealingDone: number
}

export type Event = {
  groupMemberCount: number
  numberOfParticipants: number
  EventId: number
  TimeStamp: string
  Version: number
  Killer: Player
  Victim: Player
  TotalVictimKillFame: number
  Location: null
  Participants: Array<EventParticipant>
  GroupMembers: Array<Player>
  GvGMatch: null
  BattleId: number
  KillArea: string
  Category: null
  Type: string
}

export type BaseGuildInfo = {
  Id: string
  Name: string
  FounderId: string
  FounderName: string
  Founded: string
  AllianceTag: string
  AllianceId: string
  AllianceName: null
  Logo: null
  killFame: number
  DeathFame: number
  AttacksWon: null
  DefensesWon: null
}

export type GuildInfo = {
  MemberCount: number
} & BaseGuildInfo

export type DetailedGuildInfo = {
  guild: BaseGuildInfo
  overall: GuildOverallStats
  topPlayers: Array<SearchPlayer>
  basic: BasicGuildInfo
}

export type BasicGuildInfo = {
  founder: string
  memberCount: number
  founded: string
}

export type GuildOverallStats = {
  kills: number
  gvgKills: number
  gvg: GvGStats
  fame: number
  gvgDeaths: number
  deaths: number
  ratio: string
}

export type GvGStats = {
  defense_lost: number
  attacks_won: number
  defense_won: number
  attacks_lost: number
}

export type Battle = {
  id: number
  startTime: string
  endTime: string
  timeout: string
  totalFame: number
  totalKills: number
  clusterName: null
  players: Record<string, BattlePlayer>
  guilds: Record<string, BattleGuild>
  alliances: Record<string, BattleAlliance>
  battle_TIMEOUT: number
}

export type BattleAlliance = {
  name: string
  kills: number
  deaths: number
  killFame: number
  id: string
}

export type BattleGuild = {
  name: string
  kills: number
  deaths: number
  killFame: number
  alliance: string
  allianceId: string
  id: string
}

export type BattlePlayer = {
  name: string
  kills: number
  deaths: number
  killFame: number
  guildName: string
  guildId: string
  allianceName: string
  allianceId: string
  id: string
}

export type Alliance = {
  AllianceId: string
  AllianceName: string
  AllianceTag: string
  FounderId: string
  FounderName: string
  Founded: string
  Guilds: Array<GuildIdentifier>
  NumPlayers: number
}

export type GuildIdentifier = {
  Id: string
  Name: string
}

export type WeaponCategory = {
  id: string
  name: string
}
export type ItemCategoryTree = {
  head: HeadTree
  mainhand: MainhandTree
  potion: PotionTree
  armor: ArmorTree
  bag: BagTree
  mount: MountTree
  shoes: ShoesTree
  cape: CapeTree
  food: FoodTree
  offhand: OffhandTree
}

export type ArmorTree = {
  rockgatherer_armor: string
  oregatherer_armor: string
  leather_armor: string
  fibergatherer_armor: string
  hidegatherer_armor: string
  plate_armor: string
  cloth_armor: string
  fishgatherer_armor: string
  woodgatherer_armor: string
}

export type BagTree = {
  bag: string
}

export type CapeTree = {
  rockgatherer_backpack: string
  oregatherer_backpack: string
  fishgatherer_backpack: string
  woodgatherer_backpack: string
  hidegatherer_backpack: string
  cape: string
  fibergatherer_backpack: string
}

export type FoodTree = {
  fish: string
  cooked: string
  vanity: string
}

export type HeadTree = {
  fibergatherer_helmet: string
  woodgatherer_helmet: string
  leather_helmet: string
  plate_helmet: string
  hidegatherer_helmet: string
  rockgatherer_helmet: string
  cloth_helmet: string
  oregatherer_helmet: string
  fishgatherer_helmet: string
}

export type MainhandTree = {
  firestaff: string
  dagger: string
  hammer: string
  crossbow: string
  mace: string
  cursestaff: string
  bow: string
  arcanestaff: string
  axe: string
  sword: string
  spear: string
  froststaff: string
  naturestaff: string
  knuckles: string
  quarterstaff: string
  holystaff: string
}

export type MountTree = {
  mule: string
  giantstag: string
  rare_mount: string
  swampdragon: string
  ridinghorse: string
  direbear: string
  battle_mount: string
  armoredhorse: string
  ox: string
  direwolf: string
  cougar: string
  direboar: string
}

export type OffhandTree = {
  shield: string
  horn: string
  book: string
  totem: string
  torch: string
  orb: string
}

export type PotionTree = {
  potion: string
  fishingbait: string
  vanity: string
}

export type ShoesTree = {
  unique_shoes: string
  fibergatherer_shoes: string
  rockgatherer_shoes: string
  hidegatherer_shoes: string
  plate_shoes: string
  cloth_shoes: string
  fishgatherer_shoes: string
  woodgatherer_shoes: string
  leather_shoes: string
  oregatherer_shoes: string
}

export type GuildMatch = {
  MatchId: string
  MatchType: string
  StartTime: string
  Status: number
  TerritoryChangedOwner: null
  Winner: number
  Attacker: GuildMatchParticipant
  Defender: GuildMatchParticipant
  AttackerTickets: number
  DefenderTickets: number
  AttackerTerritory: null
  DefenderTerritory: GuildMatchTerritory
  AttackerResults: Record<string, MatchContender>
  DefenderResults: Record<string, MatchContender>
  AttackerTimeline: Array<MatchTimeline>
  DefenderTimeline: Array<MatchTimeline>
  AttackerContenders: Array<MatchContender>
  DefenderContenders: Array<MatchContender>
}

export type CrystalLeagueMatch = {
  matchType: string
  category: string
  startTime: string
  winner: number
  team1Guild: null
  team1Tickets: number
  team1Territory: null
  team1Results: Record<string, MatchContender>
  team1Timeline: Array<MatchTimeline>
  team1LeaderId: string
  team2Guild: null
  team2Tickets: number
  team2Territory: null
  team2Results: Record<string, MatchContender>
  team2Timeline: Array<MatchTimeline>
  team2LeaderId: string
  crystalLeagueLevel: number
  ttl: string
  MatchId: string
}

export type GuildMatchParticipant = {
  Id: string
  Name: string
  Alliance: GuildMatchAlliance | null
}

export type GuildMatchAlliance = {
  AllianceId: string
  AllianceName: null
  AllianceTag: null
}

export type MatchContender = {
  PlayerId: string | null
  Name: string
  Team: MatchTeam
  IsMercenary: boolean | null
  Kills: number
  Deaths: number
  Healing: number | null
  Fame: number
}

export type MatchTeam = "ATTACKER" | "DEFENDER"

export type MatchTimeline = {
  EventType: string | null
  TimeStamp: string
  Tickets: number | null
}

export type GuildMatchTerritory = {
  Id: string
  Owner: GuildMatchParticipant
  Type: string
  Name: string
  ClusterId: string
  ClusterName: string
  DefensePoints: null
  DefenderBonus: null
}

export type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>

export type Range<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T
