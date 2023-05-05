
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";


const addresses = ["0x0355C2736127E130220431aB7589Aec81a0c0C30","0xA4915ab737a25dAb9226bE0B77A6Bf693fc19CCA","0x8B82337515f21bcD1815411d01AA43cd9dE57a1B","0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,0x66a37345a73D65443D497d75930bc90885B92B70"]


export const root = ()=>{
    const leaves = addresses.map(x => keccak256(x))
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    const buf2hex = x => '0x' + x.toString('hex')
    // console.log(buf2hex(tree.getRoot()))
    // console.log('root')

}

export const allowList = (address)=>{
    const leaves = addresses.map(x => keccak256(x))
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    const buf2hex = x => '0x' + x.toString('hex');
    const leaf = keccak256(address) // address from wallet using walletconnect/metamask
    const proof = tree.getProof(leaf).map(x => buf2hex(x.data))
       
    return [address,proof]

}



// will be called on click of the mint button