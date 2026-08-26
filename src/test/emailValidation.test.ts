import { describe, it, expect } from "vitest";

// Validador de papéis e e-mails SED
const detectEmailRole = (emailStr: string) => {
  const cleanEmail = emailStr.trim().toLowerCase();
  
  if (cleanEmail.endsWith("@professor.educacao.sp.gov.br")) {
    return { id: 1, roleTitle: "Professor", role: "professor" };
  }
  
  if (cleanEmail.endsWith("@al.educacao.sp.gov.br")) {
    const raPattern = /^(?:ra)?\d+[a-z0-9]?sp@al\.educacao\.sp\.gov\.br$/i;
    if (raPattern.test(cleanEmail)) {
      return { id: 3, roleTitle: "Aluno", role: "student" };
    }
  }
  
  if (
    cleanEmail.endsWith("@educacao.sp.gov.br") &&
    !cleanEmail.endsWith("@professor.educacao.sp.gov.br") &&
    !cleanEmail.endsWith("@al.educacao.sp.gov.br")
  ) {
    return { id: 2, roleTitle: "Diretor", role: "director" };
  }
  
  return null;
};

describe("SED Email Validation Rules", () => {
  it("should correctly detect student official SED email without 'ra' prefix", () => {
    const role = detectEmailRole("0000110074650xsp@al.educacao.sp.gov.br");
    expect(role).not.toBeNull();
    expect(role?.roleTitle).toBe("Aluno");
    expect(role?.id).toBe(3);
  });

  it("should detect student email with numeric digit", () => {
    const role = detectEmailRole("0001100746500sp@al.educacao.sp.gov.br");
    expect(role).not.toBeNull();
    expect(role?.roleTitle).toBe("Aluno");
  });

  it("should detect teacher and director emails", () => {
    const teacher = detectEmailRole("marcio.rocha@professor.educacao.sp.gov.br");
    expect(teacher?.roleTitle).toBe("Professor");
    expect(teacher?.id).toBe(1);

    const director = detectEmailRole("direcao@educacao.sp.gov.br");
    expect(director?.roleTitle).toBe("Diretor");
    expect(director?.id).toBe(2);
  });

  it("should reject non-institutional emails", () => {
    expect(detectEmailRole("aluno@gmail.com")).toBeNull();
    expect(detectEmailRole("usuario@hotmail.com")).toBeNull();
    expect(detectEmailRole("qualquer@outro.com.br")).toBeNull();
  });
});
