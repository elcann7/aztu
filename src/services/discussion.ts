export type DiscussionTarget = 'note' | 'material';

export const discussionThreadId = (targetType: DiscussionTarget, targetId: string) =>
  `discussion_${targetType}_${targetId}`;

export const SUGGESTION_PREFIX = '__aztu_suggestion__\n';
export const REVISION_PREFIX = '__aztu_revision__\n';

export const parseRevision = (content: string) => {
  if (!content.startsWith(REVISION_PREFIX)) return null;
  const body = content.slice(REVISION_PREFIX.length);
  const separator = body.indexOf('\n');
  if (separator < 0) return null;
  return { suggestionId: body.slice(0, separator), content: body.slice(separator + 1) };
};
