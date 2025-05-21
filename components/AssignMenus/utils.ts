type AssignResult = {
  s_assigns: { id: string; title: string; description: string }[];
  m_assigns: { id: string; title: string; description: string }[];
  l_assigns: { id: string; title: string; description: string }[];
};

export function parseAssigns(input: string): AssignResult {
  const s_assigns: { id: string; title: string; description: string }[] = [];
  const m_assigns: { id: string; title: string; description: string }[] = [];
  const l_assigns: { id: string; title: string; description: string }[] = [];

  const lines = input.trim().split("\n");

  for (const line of lines) {
    console.log("line :::", line);

    const parts = line.replaceAll("$PST;CSV;", "").split(",");

    const [
      s_id,
      s_title,
      s_desc,
      m_id,
      m_title,
      m_desc,
      l_id,
      l_title,
      l_desc,
    ] = parts;

    if (s_id && s_title) {
      s_assigns.push({
        id: s_id,
        title: s_title,
        description: s_desc || "",
      });
    }

    if (m_id && m_title) {
      m_assigns.push({
        id: m_id,
        title: m_title,
        description: m_desc || "",
      });
    }

    if (l_id && l_title) {
      l_assigns.push({
        id: l_id,
        title: l_title,
        description: l_desc || "",
      });
    }
  }

  return { s_assigns, m_assigns, l_assigns };
}
