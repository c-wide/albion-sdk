import type {
  EAST_API_URL,
  EAST_STATUS_URL,
  WEST_API_URL,
  WEST_STATUS_URL,
} from "./config.ts"

export type Ok<T> = {
  ok: true
  data: T
}

export type Err<T> = {
  ok: false
  error: T
}

export type Result<T, E> = Ok<T> | Err<E>

export type Server = "west" | "east"

export type ServerAPIURL = typeof WEST_API_URL | typeof EAST_API_URL

export type ServerStatusURL = typeof WEST_STATUS_URL | typeof EAST_STATUS_URL

export type StandardTimeRange = "week" | "month" | "lastWeek" | "lastMonth"

export type SortOptions = "totalfame" | "recent"

export type ServerOnline = {
  status: "online" | "starting"
  message: string
}

export type ServerOffline = {
  status: 500
  message: string
  timestamp: number
}

export type ServerStatus = ServerOnline | ServerOffline

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

export type SearchResult = {
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

export type Armor = {
  Type: string
  Count: number
  Quality: number
  ActiveSpells: Array<never>
  PassiveSpells: Array<never>
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

export type Participant = Player & {
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
  Participants: Array<Participant>
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
