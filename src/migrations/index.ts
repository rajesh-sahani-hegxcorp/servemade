import * as migration_20260901_111715_baseline from './20260901_111715_baseline';
import * as migration_20260902_080301_add_homepage_sections from './20260902_080301_add_homepage_sections';
import * as migration_20260902_103932_remove_homepage_stats from './20260902_103932_remove_homepage_stats';

export const migrations = [
  {
    up: migration_20260901_111715_baseline.up,
    down: migration_20260901_111715_baseline.down,
    name: '20260901_111715_baseline',
  },
  {
    up: migration_20260902_080301_add_homepage_sections.up,
    down: migration_20260902_080301_add_homepage_sections.down,
    name: '20260902_080301_add_homepage_sections',
  },
  {
    up: migration_20260902_103932_remove_homepage_stats.up,
    down: migration_20260902_103932_remove_homepage_stats.down,
    name: '20260902_103932_remove_homepage_stats'
  },
];
