import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword, saltRounds = 10) {

    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;

}

export async function verifyPassword(plainPassword, hashPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashPassword)
    return isMatch
}